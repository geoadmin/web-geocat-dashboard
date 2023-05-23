$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

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

function updateMetadataExternalPortal(data) {
  // Parse data object and retrieve metadata counts
  let md_total=data.hits.total.value;
  let md_bgdi = data.aggregations.tag.buckets.bgdi.doc_count;
  let md_ods = data.aggregations.tag.buckets.ods.doc_count;
  let md_gdb = data.aggregations.tag.buckets.gdb.doc_count;

  // update html and css
  $(".md-ods").text(stringifyNumber(md_ods) + " - opendata.swiss");
  $(".md-ods").css("width", (md_ods/md_total)*100 + 20 + "%");
  $(".md-bgdi").text(stringifyNumber(md_bgdi) + " - BGDI");
  $(".md-bgdi").css("width", (md_bgdi/md_total)*100 + 20 + "%");
  $(".md-gdb").text(stringifyNumber(md_gdb) + " - INSPIRE");
  $(".md-gdb").css("width", (md_gdb/md_total)*100 + 20 + "%");
}

function updateMetadataByDistribution(data) {
  // Parse data object and retrieve metadata counts
  let md_total=data.hits.total.value;
  let md_link = data.aggregations.resource.buckets.link.doc_count;
  let md_download = data.aggregations.resource.buckets.download.doc_count;
  let md_api = data.aggregations.resource.buckets.api.doc_count;
  let md_no_resource = data.aggregations.resource.buckets.no_resource.doc_count;

  // update html and css
  $(".md-link").text(stringifyNumber(md_link) + " - Web link");
  $(".md-link").css("width", (md_link/md_total)*100 + "%");
  $(".md-download").text(stringifyNumber(md_download) + " - Download link");
  $(".md-download").css("width", (md_download/md_total)*100 + "%");
  $(".md-api").text(stringifyNumber(md_api) + " - Web services");
  $(".md-api").css("width", (md_api/md_total)*100 + "%");
  $(".md-no-resource").text(stringifyNumber(md_no_resource) + " - No distribution");
  $(".md-no-resource").css("width", (md_no_resource/md_total)*100 + "%");
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
          updateMetadataExternalPortal(json);
          updateMetadataByDistribution(json);
        })
});




