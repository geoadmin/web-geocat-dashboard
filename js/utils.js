// Transform integer into string with thousand separator
function stringifyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// Update _search request's body with time interval for updated metadata
function addSearchQueryUpdatedMetadata(body){

    let date = new Date()
  
    // Last 30 days
    let endDate = date.toJSON().slice(0, 10);
    date.setDate(date.getDate() - 30);
    let startDate = date.toJSON().slice(0, 10);
    let interval = "[" + startDate + " TO " + endDate + "]";
    body.aggregations.update.filters.filters.last30daysNotHarv.query_string.query = (
      body.aggregations.update.filters.filters.last30daysNotHarv.query_string.query.replace(/interval/g, interval)
    );
    body.aggregations.update.filters.filters.last30daysHarv.query_string.query = (
      body.aggregations.update.filters.filters.last30daysHarv.query_string.query.replace(/interval/g, interval)
    );
  
    // YTD
    startDate = new Date().getFullYear() + "-01-01"
    interval = "[" + startDate + " TO " + endDate + "]";
    body.aggregations.update.filters.filters.ytdNotHarv.query_string.query = (
      body.aggregations.update.filters.filters.ytdNotHarv.query_string.query.replace(/interval/g, interval)
    );
    body.aggregations.update.filters.filters.ytdHarv.query_string.query = (
      body.aggregations.update.filters.filters.ytdHarv.query_string.query.replace(/interval/g, interval)
    );  
  
    return body;
  
  }