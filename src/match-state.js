/** Player roles, possession locks and city awards are independent of wallets
 * and rendering. A unit keeps its economic owner while an ally controls it. */
export function createMatchState(config={}){
  const players=(config.players??[]).map(p=>({...p,role:p.role==='tps'?'tps':'hybrid',avatarId:null,unitId:null,lastUnitId:null,cityIds:[],assignedCityIds:[],voluntaryTps:p.role==='tps'}));
  const byPlayer=new Map(players.map(p=>[p.id,p])),locks=new Map(),invitations=new Map(),cityOwners=new Map(),establishedTeams=new Set(),rosterTeams=new Set(players.map(p=>p.teamId)),capturedCities=new Set(),events=[];let revision=0,nextInvitation=1,captured=false,winnerTeamId=null;
  const ownerTeam=id=>byPlayer.get(id)?.teamId??id;
  function release(playerId){const player=byPlayer.get(playerId);if(!player)return{ok:false,code:'unknown-player'};if(player.unitId){locks.delete(player.unitId);player.lastUnitId=player.unitId;player.unitId=null;player.controlledOwnerId=null;revision++;}return{ok:true};}
  function possess(playerId,unit){const player=byPlayer.get(playerId);if(!player||!unit||unit.hp<=0||unit.active===false)return{ok:false,code:'unavailable-unit'};
    if(player.role==='hybrid'?unit.ownerId!==playerId:ownerTeam(unit.ownerId)!==player.teamId)return{ok:false,code:'not-authorized'};
    const controller=locks.get(unit.id);if(controller&&controller!==playerId)return{ok:false,code:'unit-possessed'};
    release(playerId);locks.set(unit.id,playerId);player.unitId=unit.id;player.controlledOwnerId=unit.ownerId;player.lastUnitId=unit.id;revision++;return{ok:true,unitId:unit.id};}
  function setRole(playerId,role){const player=byPlayer.get(playerId);if(!player||!['hybrid','tps'].includes(role))return{ok:false,code:'invalid-role'};
    if(role==='hybrid'&&player.role==='tps')return{ok:false,code:'capture-required'};
    if(role!==player.role){player.role=role;player.voluntaryTps=true;revision++;events.push({type:'role-changed',playerId,role,reason:'voluntary'});}return{ok:true,role:player.role};}
  function syncCities(cities){const old=[...cityOwners];cityOwners.clear();for(const player of players){player.cityIds=[];player.assignedCityIds=[];}
    for(const city of cities??[]){if(!city?.id||city.neutral||city.village||city.outpost||Number.isFinite(city.houseCount)&&city.houseCount<3)continue;cityOwners.set(city.id,city.ownerId);const player=byPlayer.get(city.ownerId);if(player){player.cityIds.push(city.id);if(!city.steward){player.assignedCityIds.push(city.id);player.hadAssignedCity=true;}establishedTeams.add(player.teamId);player.hadCity=true;}}
    for(const player of players)if(player.hadAssignedCity&&!player.assignedCityIds.length&&player.role==='hybrid'){player.role='tps';revision++;events.push({type:'role-changed',playerId:player.id,role:'tps',reason:'city-lost'});}
    for(const [id,invite] of invitations)if(cityOwners.get(invite.cityId)!==invite.fromPlayerId){invitations.delete(id);revision++;}
    const remainingTeams=new Set(players.filter(p=>p.cityIds.length).map(p=>p.teamId));
    if(!winnerTeamId&&captured&&establishedTeams.size>=Math.max(2,rosterTeams.size)&&remainingTeams.size===1){winnerTeamId=[...remainingTeams][0];events.push({type:'match-won',teamId:winnerTeamId});revision++;}
    if(old.length!==cityOwners.size||old.some(([id,owner])=>cityOwners.get(id)!==owner))revision++;
  }
  function inviteCity(cityId,fromPlayerId,toPlayerId){const from=byPlayer.get(fromPlayerId),to=byPlayer.get(toPlayerId);
    if(!from||!to||from.teamId!==to.teamId||to.role!=='tps'||to.assignedCityIds.length||!capturedCities.has(cityId)||cityOwners.get(cityId)!==fromPlayerId)return{ok:false,code:'invalid-city-award'};
    for(const invitation of invitations.values())if(invitation.cityId===cityId)invitations.delete(invitation.id);
    const invitation={id:`city-award-${nextInvitation++}`,cityId,fromPlayerId,toPlayerId,teamId:from.teamId};invitations.set(invitation.id,invitation);revision++;return{ok:true,invitation};}
  function acceptCity(playerId,invitationId){const invitation=invitations.get(invitationId),player=byPlayer.get(playerId);
    if(!player||player.role!=='tps'||player.assignedCityIds.length||invitation?.toPlayerId!==playerId||cityOwners.get(invitation.cityId)!==invitation.fromPlayerId)return{ok:false,code:'invalid-invitation'};
    // Several cities can finish capture in one simulation tick. An accepted
    // command fills the recipient's one city slot, invalidating their other
    // outstanding offers before any queued UI action can claim a second.
    for(const [id,offer]of invitations)if(offer.toPlayerId===playerId)invitations.delete(id);
    capturedCities.delete(invitation.cityId);cityOwners.set(invitation.cityId,playerId);const previous=byPlayer.get(invitation.fromPlayerId);if(previous){previous.cityIds=previous.cityIds.filter(id=>id!==invitation.cityId);previous.assignedCityIds=previous.assignedCityIds.filter(id=>id!==invitation.cityId);}
    if(!player.cityIds.includes(invitation.cityId))player.cityIds.push(invitation.cityId);player.assignedCityIds.push(invitation.cityId);player.role='hybrid';player.hadCity=true;player.hadAssignedCity=true;player.voluntaryTps=false;
    if(player.unitId&&player.controlledOwnerId!==playerId)release(playerId);
    events.push({type:'role-changed',playerId,role:'hybrid',reason:'city-award'});revision++;
    return{ok:true,cityId:invitation.cityId,fromOwnerId:invitation.fromPlayerId,toOwnerId:playerId,teamId:player.teamId};}
  return{players,localPlayerId:config.localPlayerId??players[0]?.id,player:id=>byPlayer.get(id)??null,teamId:ownerTeam,
    allied:(a,b)=>ownerTeam(a)===ownerTeam(b),controller:unitId=>locks.get(unitId)??null,possess,release,setRole,syncCities,inviteCity,acceptCity,
    setAvatar(playerId,unitId){const player=byPlayer.get(playerId);if(!player)return false;player.avatarId=unitId;revision++;return true;},
    removeUnit(unitId){const controller=locks.get(unitId);if(controller)release(controller);for(const player of players)if(player.avatarId===unitId){player.avatarId=null;revision++;}},
    recordCapture(cityId,ownerId){captured=true;capturedCities.add(cityId);const previous=cityOwners.get(cityId);cityOwners.set(cityId,ownerId);const old=byPlayer.get(previous),player=byPlayer.get(ownerId);if(old){old.cityIds=old.cityIds.filter(id=>id!==cityId);old.assignedCityIds=old.assignedCityIds.filter(id=>id!==cityId);}if(player&&!player.cityIds.includes(cityId))player.cityIds.push(cityId);revision++;},
    declineCity(playerId,id){const invitation=invitations.get(id);if(invitation?.toPlayerId!==playerId)return{ok:false,code:'invalid-invitation'};invitations.delete(id);revision++;return{ok:true};},
    drainEvents(){return events.splice(0);},get winnerTeamId(){return winnerTeamId;},get invitations(){return [...invitations.values()];},get revision(){return revision;},dispose(){locks.clear();invitations.clear();cityOwners.clear();events.length=0;}};
}
