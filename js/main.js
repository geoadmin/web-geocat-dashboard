function updateMetadataTotalCount(data) {
  // Parse data object and retrieve metadata counts
  let md_total
  let md_direct;
  let md_harvested;

  md_total=data.hits.total.value;

  let buckets = data.aggregations.isHarvested.buckets;

  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].key_as_string == "true"){
      md_harvested = buckets[i].doc_count;
    }
  }

  md_direct = md_total - md_harvested

  // update html and css
  $(".md-total").text(stringifyNumber(md_total) + " metadata");
  $(".md-direct").text(stringifyNumber(md_direct) + " direct");
  $(".md-direct").css("width", (md_direct/md_total)*100 + "%");
  $(".md-harvested").text(stringifyNumber(md_harvested) + " harvested");
  $(".md-harvested").css("width", "calc(" + (md_harvested/md_total)*100 + "% - 4px)");

}

function updateMetadataResouceTypeCount(data) {
  // Parse data object and retrieve metadata counts
  let md_dataset;
  let md_service;
  let md_model;
  let md_other;
  let md_total=data.hits.total.value;

  let buckets = data.aggregations.resourceType.buckets;

  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].key == "dataset"){
      md_dataset = buckets[i].doc_count;
    }
    else if(buckets[i].key == "service"){
      md_service = buckets[i].doc_count;
    }
    else if(buckets[i].key == "model"){
      md_model = buckets[i].doc_count;
    }
  }

  md_other = md_total - md_dataset - md_service - md_model

  // update html and css
  $(".md-dataset").text(stringifyNumber(md_dataset) + " datasets");
  $(".md-dataset").css("width", (md_dataset/md_total)*100 + "%");
  $(".md-service").text(stringifyNumber(md_service) + " services");
  $(".md-service").css("width", (md_service/md_total)*100 + 20 + "%");
  $(".md-model").text(stringifyNumber(md_model) + " models");
  $(".md-model").css("width", (md_model/md_total)*100 + 20 + "%");
  $(".md-other").text(stringifyNumber(md_other) + " other");
  $(".md-other").css("width", (md_other/md_total)*100 + 20 + "%");
}

$.getJSON("data/search_body.json", function(json) {

    let md_total;
    let md_direct;
    let md_harvested;

    fetch("https://www.geocat.ch/geonetwork/srv/api/search/records/_search", {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          updateMetadataTotalCount(json);
          updateMetadataResouceTypeCount(json);
        })
});




