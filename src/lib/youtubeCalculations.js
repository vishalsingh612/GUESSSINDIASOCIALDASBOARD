export function getInsightValue(insights, key) {
    const item = insights.find((x) => x.label === key);
    return item ? item.value : null;
  }
  
  export function calcViewsPerSubscriber({ views, subscribers }) {
    if (!subscribers) return 0;
    return views / subscribers;
  }
  
  export function calcContentTotal(contentShared) {
    return contentShared.reduce((s, x) => s + Number(x.value || 0), 0);
  }
  
  export function calcTrafficSourceTotal(trafficSource) {
    return trafficSource.reduce((s, x) => s + Number(x.value || 0), 0);
  }
  