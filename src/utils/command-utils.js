export const TAKE_AWAY = 'TAKE_AWAY';
export const ON_SITE = 'ON_SITE';

export default {
  commandItemFullId(plateId, variationId, choiceId) {
    let fullId = plateId;
    if (variationId) {
      fullId += `_${variationId}`;
    }
    if (choiceId) {
      fullId += `_${choiceId}`;
    }
    console.log('commandItemFullId', plateId, variationId, choiceId, fullId);
    return fullId;
  },
};
