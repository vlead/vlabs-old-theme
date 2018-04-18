function submit_feedback(lab_id, lab_name, exp_id, exp_name, user_id) {
  var key = "defaultkey"
  if (exp_id == "" || exp_name == "")
    {
 // feedback_url = "http://feedback-stage.vlabs.ac.in/feedback?lab_name="+lab_name+"&key=defaultkey"+"&user_id="+user_id
  feedback_url = "http://feedback.vlabs.ac.in/feedback?lab_name="+lab_name+"&key=defaultkey"+"&user_id="+user_id
  window.open(feedback_url, '_blank');
    }
else {
  ///Experiment wise feedback
  //feedback_url = "http://feedback-stage.vlabs.ac.in/feedback?lab_name="+lab_name+"&exp_name="+exp_name+"&key=defaultkey"+"&user_id="+user_id
  feedback_url = "http://feedback.vlabs.ac.in/feedback?lab_name="+lab_name+"&exp_name="+exp_name+"&key=defaultkey"+"&user_id="+user_id

  window.open(feedback_url, '_blank'); 
}
}

