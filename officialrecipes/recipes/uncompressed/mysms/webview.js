"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    const elements = document.getElementsByClassName('unread');

    let count = 0;
    for (let i = 0; i < elements.length; i++) {
      let count_line = parseInt(elements[i].innerText.replace(/[^0-9.]/g, ""));
      if (count_line > 0) {
        count++; // count 1 per channel with messages
      }
    }

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15c21zL3dlYnZpZXcuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIkZyYW56IiwiZ2V0TWVzc2FnZXMiLCJlbGVtZW50cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNvdW50IiwiaSIsImxlbmd0aCIsImNvdW50X2xpbmUiLCJwYXJzZUludCIsImlubmVyVGV4dCIsInJlcGxhY2UiLCJzZXRCYWRnZSIsImxvb3AiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBa0JDLEtBQUQsSUFBVztBQUMxQixRQUFNQyxjQUFjLFNBQVNBLFdBQVQsR0FBdUI7QUFDekMsVUFBTUMsV0FBV0MsU0FBU0Msc0JBQVQsQ0FBZ0MsUUFBaEMsQ0FBakI7O0FBRUQsUUFBSUMsUUFBUSxDQUFaO0FBQ0EsU0FBSSxJQUFJQyxJQUFJLENBQVosRUFBZUEsSUFBSUosU0FBU0ssTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3hDLFVBQUlFLGFBQWFDLFNBQVNQLFNBQVNJLENBQVQsRUFBWUksU0FBWixDQUFzQkMsT0FBdEIsQ0FBOEIsVUFBOUIsRUFBMEMsRUFBMUMsQ0FBVCxDQUFqQjtBQUNBLFVBQUlILGFBQWEsQ0FBakIsRUFBb0I7QUFDbkJILGdCQURtQixDQUNWO0FBQ1Q7QUFDRDs7QUFFQUwsVUFBTVksUUFBTixDQUFlUCxLQUFmO0FBQ0QsR0FaRDs7QUFjQUwsUUFBTWEsSUFBTixDQUFXWixXQUFYO0FBQ0QsQ0FoQkQiLCJmaWxlIjoibXlzbXMvd2Vidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKEZyYW56KSA9PiB7XG4gIGNvbnN0IGdldE1lc3NhZ2VzID0gZnVuY3Rpb24gZ2V0TWVzc2FnZXMoKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1bnJlYWQnKTtcblxuICBcdGxldCBjb3VudCA9IDA7XG4gIFx0Zm9yKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gIFx0XHRsZXQgY291bnRfbGluZSA9IHBhcnNlSW50KGVsZW1lbnRzW2ldLmlubmVyVGV4dC5yZXBsYWNlKC9bXjAtOS5dL2csIFwiXCIpKTtcbiAgXHRcdGlmIChjb3VudF9saW5lID4gMCkge1xuICBcdFx0XHRjb3VudCsrOyAvLyBjb3VudCAxIHBlciBjaGFubmVsIHdpdGggbWVzc2FnZXNcbiAgXHRcdH1cbiAgXHR9XG5cbiAgICBGcmFuei5zZXRCYWRnZShjb3VudCk7XG4gIH07XG5cbiAgRnJhbnoubG9vcChnZXRNZXNzYWdlcyk7XG59O1xuIl19