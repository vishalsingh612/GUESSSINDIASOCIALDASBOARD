export async function resolveChannelIdFromHandle(handle, apiKey) {
    const q = handle.replace("@", "");
  
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
      q
    )}&maxResults=1&key=${apiKey}`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    if (!data.items || data.items.length === 0) {
      throw new Error(`Channel not found for handle: ${handle}`);
    }
  
    return data.items[0].id.channelId;
  }
  
  export async function fetchChannelStats(channelId, apiKey) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    if (!data.items || data.items.length === 0) {
      throw new Error(`No channel stats found for ID: ${channelId}`);
    }
  
    const ch = data.items[0];
  
    return {
      channelId,
      title: ch.snippet?.title,
      thumbnail: ch.snippet?.thumbnails?.high?.url,
      subscribers: Number(ch.statistics?.subscriberCount || 0),
      views: Number(ch.statistics?.viewCount || 0),
      videos: Number(ch.statistics?.videoCount || 0),
    };
  }
  