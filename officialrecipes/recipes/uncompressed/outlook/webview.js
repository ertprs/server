"use strict";

module.exports = Franz => {
  const getMessages = function getMessages() {
    const unreadMail = parseInt(jQuery("i[data-icon-name='Inbox'] + span + span > span").first().text(), 10);
    Franz.setBadge(unreadMail);
  };
  Franz.loop(getMessages);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmljZTM2NS1vd2Evd2Vidmlldy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiRnJhbnoiLCJnZXRNZXNzYWdlcyIsInVucmVhZE1haWwiLCJwYXJzZUludCIsImpRdWVyeSIsImZpcnN0IiwidGV4dCIsInNldEJhZGdlIiwibG9vcCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEFBQVAsVUFBa0IsQUFBRCxTQUFXLEFBQzFCO1FBQU0sY0FBYyxTQUFTLEFBQVQsY0FBdUIsQUFDekM7VUFBTSxhQUFhLFNBQVMsT0FBTyxBQUFQLEFBQTRDLEFBQTVDLEFBQW9ELEFBQXBELGtEQUFULEFBQXFFLEFBQXJFLEFBQW5CLGdCQUNBO1VBQU0sQUFBTixTQUFlLEFBQWYsQUFDRDtBQUhELEFBSUE7UUFBTSxBQUFOLEtBQVcsQUFBWCxBQUNEO0FBTkQiLCJmaWxlIjoib2ZmaWNlMzY1LW93YS93ZWJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAoRnJhbnopID0+IHtcbiAgY29uc3QgZ2V0TWVzc2FnZXMgPSBmdW5jdGlvbiBnZXRNZXNzYWdlcygpIHtcbiAgICBjb25zdCB1bnJlYWRNYWlsID0gcGFyc2VJbnQoalF1ZXJ5KFwic3Bhblt0aXRsZSo9J0luYm94J10gKyBkaXYgPiBzcGFuXCIpLmZpcnN0KCkudGV4dCgpLCAxMCk7XG4gICAgRnJhbnouc2V0QmFkZ2UodW5yZWFkTWFpbCk7XG4gIH07XG4gIEZyYW56Lmxvb3AoZ2V0TWVzc2FnZXMpO1xufTtcbiJdfQ==