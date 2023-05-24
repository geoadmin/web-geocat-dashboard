// Enable BS4 tooltip
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
  $(".md-dataset").text(stringifyNumber(md_dataset));
  $(".md-dataset").css("width", (md_dataset/md_total)*100 + "%");
  $(".md-service").text(stringifyNumber(md_service));
  $(".md-service").css("width", (md_service/md_total)*100 + "%");
  $(".md-model").text(stringifyNumber(md_model));
  $(".md-model").css("width", (md_model/md_total)*100 + "%");
  $(".md-other").text(stringifyNumber(md_other));
  $(".md-other").css("width", (md_other/md_total)*100 + "%");
}

function updateMetadataExternalPortal(data) {
  // Parse data object and retrieve metadata counts
  let md_total=data.hits.total.value;
  let md_bgdi = data.aggregations.tag.buckets.bgdi.doc_count;
  let md_ods = data.aggregations.tag.buckets.ods.doc_count;
  let md_gdb = data.aggregations.tag.buckets.gdb.doc_count;

  // update html and css
  $(".md-ods").text(stringifyNumber(md_ods));
  $(".md-ods").css("width", (md_ods/md_total)*100 + "%");
  $(".md-bgdi").text(stringifyNumber(md_bgdi));
  $(".md-bgdi").css("width", (md_bgdi/md_total)*100 + "%");
  $(".md-gdb").text(stringifyNumber(md_gdb));
  $(".md-gdb").css("width", (md_gdb/md_total)*100 + "%");
}

function updateMetadataByDistribution(data) {
  // Parse data object and retrieve metadata counts
  let md_total=data.hits.total.value;
  let md_link = data.aggregations.resource.buckets.link.doc_count;
  let md_download = data.aggregations.resource.buckets.download.doc_count;
  let md_api = data.aggregations.resource.buckets.api.doc_count;
  let md_no_resource = data.aggregations.resource.buckets.no_resource.doc_count;

  // update html and css
  $(".md-link").text(stringifyNumber(md_link));
  $(".md-link").css("width", (md_link/md_total)*100 + "%");
  $(".md-download").text(stringifyNumber(md_download));
  $(".md-download").css("width", (md_download/md_total)*100 + "%");
  $(".md-api").text(stringifyNumber(md_api));
  $(".md-api").css("width", (md_api/md_total)*100 + "%");
  $(".md-no-resource").text(stringifyNumber(md_no_resource));
  $(".md-no-resource").css("width", (md_no_resource/md_total)*100 + "%");
}

function updateMetadataByAdminLevel(data) {
  // Parse data object and retrieve metadata counts
  let md_total=data.hits.total.value;
  let md_national = data.aggregations.adminLevel.buckets.national.doc_count;
  let md_cantonal = data.aggregations.adminLevel.buckets.cantonal.doc_count;
  let md_cantonalCommunal = data.aggregations.adminLevel.buckets.cantonalCommunal.doc_count;
  let md_communal = data.aggregations.adminLevel.buckets.communal.doc_count;
  let md_other = md_total - md_national - md_cantonal - md_cantonalCommunal - md_communal;

  // update html and css
  $("#admin-level .md-national").text(stringifyNumber(md_national));
  $("#admin-level .md-national").css("width", (md_national/md_total)*100 + "%");
  $("#admin-level .md-cantonal").text(stringifyNumber(md_cantonal));
  $("#admin-level .md-cantonal").css("width", (md_cantonal/md_total)*100 + "%");
  $("#admin-level .md-cantonalCommunal").text(stringifyNumber(md_cantonalCommunal));
  $("#admin-level .md-cantonalCommunal").css("width", (md_cantonalCommunal/md_total)*100 + "%");
  $("#admin-level .md-communal").text(stringifyNumber(md_communal));
  $("#admin-level .md-communal").css("width", (md_communal/md_total)*100 + "%");
  $("#admin-level .md-other").text(stringifyNumber(md_other));
  $("#admin-level .md-other").css("width", (md_other/md_total)*100 + "%");
}

function updateGroupCount(data) {
  // Parse data object and retrieve metadata counts
  let gp_metadata = data.aggregations.groupOwner.buckets.length;

  // update html and css
  $("#group .gp-metadata").text(stringifyNumber(gp_metadata));
}

function updateMetadataUpdate(data) {
  // Parse data object and retrieve metadata counts
  let md_total=data.hits.total.value;
  let md_30NotHarv = data.aggregations.update.buckets.last30daysNotHarv.doc_count;
  let md_30Harv = data.aggregations.update.buckets.last30daysHarv.doc_count;
  let md_ytdNotHarv = data.aggregations.update.buckets.ytdNotHarv.doc_count;
  let md_ytdHarv = data.aggregations.update.buckets.ytdHarv.doc_count;
  
  let year = new Date().getFullYear()
  let startDate = new Date("01/01/" + year);
  let endDate = new Date();
  let difference = endDate.getTime() - startDate.getTime();
  let days = Math.ceil(difference / (1000 * 3600 * 24));


  // update html and css
  $("#update .md-update-30-direct").text(stringifyNumber(md_30NotHarv) + " (" + Math.round(md_30NotHarv/30) + "/day)");
  $("#update .md-update-30-direct").css("width", (md_30NotHarv/md_total)*100 + "%");
  $("#update .md-update-30-harv").text(stringifyNumber(md_30Harv) + " (" + Math.round(md_30Harv/30) + "/day)");
  $("#update .md-update-30-harv").css("width", (md_30Harv/md_total)*100 + "%");
  $("#update .md-update-ytd-direct").text(stringifyNumber(md_ytdNotHarv) + " (" + Math.round(md_ytdNotHarv/days) + "/day)");
  $("#update .md-update-ytd-direct").css("width", (md_ytdNotHarv/md_total)*100 + "%");
  $("#update .md-update-ytd-harv").text(stringifyNumber(md_ytdHarv) + " (" + Math.round(md_ytdHarv/days) + "/day)");
  $("#update .md-update-ytd-harv").css("width", (md_ytdHarv/md_total)*100 + "%");
}

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

// POST _search query for metadata
$.getJSON("data/search_body.json", function(json) {

    addSearchQueryUpdatedMetadata(json);

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
          updateMetadataByAdminLevel(json);
          updateGroupCount(json);
          updateMetadataUpdate(json);
        })
});