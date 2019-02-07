function iframeLoaded(chapter) {
  var iFrameID = document.getElementById('chapter_' + chapter);
  if (iFrameID) {
    iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
  }
}