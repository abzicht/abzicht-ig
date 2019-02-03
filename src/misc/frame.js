function iframeLoaded(chapter) {
      var iFrameID = document.getElementById('chapter'+ chapter);
      if(iFrameID) {
            // here you can make the height, I delete it first, then I make it again
            iFrameID.height = "";
            iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
      }
  }
