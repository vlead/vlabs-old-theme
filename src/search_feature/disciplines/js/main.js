var loadIndex = function(discId) {
  displayLabsOfDiscipline(discId);
};

var getJSON = function(resourcePath) {
  return get(resourcePath).then(JSON.parse);
};

var get = function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest(url);
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error("network error"));
    };
    req.send();
  });
};

var disciplinePromise;
var getDisciplines = function() {
  disciplinePromise = disciplinePromise || getJSON(disResPath);
  return disciplinePromise.then(function(disciplines) {
    return disciplines;
  });
}

var institutePromise;
var getInstitutes = function() {
  institutePromise = institutePromise || getJSON(instResPath);
  return institutePromise.then(function(institutes) {
    return institutes;
  });
}

var labPromise;
var getLabs = function() {
  labPromise = labPromise || getJSON(labResPath);
  return labPromise.then(function(labs) {
    return labs;
  });
}

var filterQuery = function(ls, id) {
  return ls.filter(function(el) {
    return el.id == id;
  });
};


var labsByDisciplinePromises = [];
var getLabsByDiscipline = function(discId) {
  var labByDiscResPath = labsByDiscUrl + discId;
  var searchList = filterQuery(labsByDisciplinePromises, discId);
  var labsByDiscPromise;
  if (searchList.length == 0) {
    labsByDiscPromise = getJSON(labByDiscResPath);
    labsByDisciplinePromises.push({'id': discId, 'promise': labsByDiscPromise});
  } else {
    labsByDiscPromise = searchList[0].promise;
  }

  return labsByDiscPromise.then(function(labs) {
    return labs;
  });
};

var filterLabsByPhase = function(labs) {
  return labs.filter(function(lab) { 
    if (phaseLength == 0) {
      return true;
    }
    else {
      return ((lab.phase.length == phaseLength) && (lab.phase[0].phase_id == phaseId)); 
    }
  }) ;
};

  var buildLabsDisplayList = function(labs) {
      if (labs.length == 0){
      return '<div class="container-fluid"><div class="row">' +"<h2 style='text-align:center; color:red;'>No labs found!</h2>" +
        '</div></div>';
    }

    labs.sort(function(a, b) {
      var nameA = a['lab_name'].toUpperCase(); // ignore upper and lowercase
      var nameB = b['lab_name'].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  
    var displayList = labs.map(function(lab) {
      var lab_name = lab['lab_name'];                                                                      
      var hosted_url = getTheRightUrl(lab['hosting_info']);
      var assets = filterAssetsbyAssetType(lab['assets']);
      var image_name = assets[0].path;
      var path = labImagesUrl + image_name;
      // return lab_name;
      return '<div class=" col-md-12 " id='+ lab_name + '> <div  style="margin-top: 20px; " class="lab-list-row-div" style="cursor:pointer; padding: 0px !important;"><a  href="' + hosted_url + '" ><div><p id="' + hosted_url + '"  >'+ lab_name +'</p></a></div></div></div>';
    });
  
    var displayLabs = displayList.reduce(function(acc, el) {
      acc += el;
      return acc;
    });
    // return displayLabs;
    return '<div class="container-fluid"><div class="row">' + 
      displayLabs +
      '</div></div>';
  };

var displayContentInDiv = function(data) {
  document.getElementById("output").innerHTML = data;
};

var modifyUrl = function(url) {
  return hostedBaseForOpenEdx + "/" + url.split("/").slice(3).join("/");
};

var displayLabsOfDiscipline = function(discId) {
 getLabsByDiscipline(discId)
    .then(filterLabsByPhase)
    .then(buildLabsDisplayList)
    .then(displayContentInDiv)
    .catch(function(err) {
      console.log("Error from displayLabsOfDiscipline: " + err);
    });
};

var getTheRightUrl = function(hostingInfos) {
  var filterHostingInfo = function(hostingInfos, key) {
    return hostingInfos.filter(function(hostingInfo) {
      return hostingInfo.hosted_on == key;
    });
  };

  var getAtleastOneHostingInfo = function(hostingInfos) {
    var filteredHostingInfos = filterHostingInfo(hostingInfos, firstChoiceUrl);

    if (filteredHostingInfos.length == 0) {
      filteredHostingInfos = filterHostingInfo(hostingInfos, secondChoiceUrl);
    }

    if (filteredHostingInfos.length == 0) {
      filteredHostingInfos = filterHostingInfo(hostingInfos, thirdChoiceUrl);
    }

    if (filteredHostingInfos.length > 0) {
      return filteredHostingInfos[0];
    } else {
      return null;
    }
  };

  var hostedUrl = "";
  var hostingInfo = getAtleastOneHostingInfo(hostingInfos);
  if (hostingInfo != null) {
    if (hostingInfo['hosted_on'] == openEdxHosted) {
      hostedUrl = modifyUrl(hostingInfo['hosted_url']);
    } else {
      hostedUrl = hostingInfo['hosted_url'];
    }
  }
  return hostedUrl;
};

var filterAssetsbyAssetType = function(assets){
  return assets.filter(function(asset){
    return asset.asset_type.asset_type == 'image';
  });
};

