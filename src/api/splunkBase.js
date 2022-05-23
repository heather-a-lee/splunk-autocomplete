class SplunkBaseApi {
  cachedResults;

  async getAllData(path) {
    if (this.cachedResults) { // This is for local development to reduce spamming API on hot reloading
      console.log("Loading from cache...");
      return this.cachedResults;
    }
    let { offset, limit, total, results } = await this.get(path);
    let result = [...results];
    let currentOffset = offset + limit;
    let requestPromises = [];
    while (currentOffset < total) {
      requestPromises.push(this.get(path, currentOffset));
      currentOffset = currentOffset + limit;
    }
    const allData = await Promise.all(requestPromises);
    allData.forEach(data => {
      result = [...result, ...data.results];
    });
    this.cachedResults = result;
    return result;
  }

  async get(path, offset = 0) {
    const params = new URLSearchParams({
      limit: 100,
      offset,
    });
    const res = await fetch(`${path}?${params}`); 
    return res.json();
  }
}

export default SplunkBaseApi;