var ldsUrl = "https://lds.vlabs.ac.in";
var labImagesUrl = "https://s3-us-west-1.amazonaws.com/ld-service/images/new-lab-images/";
var labsByDiscUrl = ldsUrl + "/labs?cached=1&consumer=lp&discipline_name=";
//this variable can be either "openedx", "test-openedx", "cloud" or "institute"
var openEdxHosted = "openedx"; //this can be either "openedx" or "test-openedx" etc.
var cloudHosted = "cloud";  //this can be either "cloud" or staging etc.
var firstChoiceUrl = cloudHosted;
var secondChoiceUrl = "institute";
var thirdChoiceUrl = openEdxHosted;
var phaseLength = 1;
var phaseId = 2;
var hostedBaseForOpenEdx = "https://openedx.vlabs.ac.in";

