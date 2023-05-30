// **라우트랑 텍스트는 구분해서 관리.
export const hwayang = `https://port-0-hwayang-7e6o2clhv5snco.sel4.cloudtype.app/`;
export const adminServer = `http://localhost:80`;

export const Routes = {
  login: `/`,
  home: `/admin`,
  myPage: `/my-page`,
  signUp: `/sign-up`,
  logout: `/logout`,
  worshipResult: `/admin/worship-result`,
  worshipGuide: `/admin/worship-guide`,

  worshipManagement: `/admin/worship-management`,
  addWorshipManagement: `/api/admin/worship-management/add`,
  getWorshipManagement: `/api/admin/worship-management`,
  editWorshipManagement: `/api/admin/worship-management/edit`,
  speakerImageSave: `/api/admin/worship/image-save`,
  worshipDetail: `/admin/worship-management/:id`,
  postWorship: `/api/admin/worship-management`,

  getPraysRequest: `http://localhost:8080/api/users/prays-request`,
  getPrayRequest: `http://localhost:8080/api/users/pray-request`,
  prayRequest: `/admin/pray-request`,
  prayRequestDetail: `/admin/pray-request/:id`,

  getGraceSharing: `http://localhost:8080/api/users/grace-sharing`,
  graceSharing: `/admin/grace-sharing`,
  graceSharingWrite: `/admin/grace-sharing/write`,
  graceSharingDetail: `/admin/grace-sharing/:id`,
  graceSharingDelete: `http://localhost:8080/api/users/grace-sharing/delete`,
  graceImageSave: `/api/users/grace-sharing/write/image-save`,

  getThanksLetter: `http://localhost:8080/api/users/thanks-letters`,
  // getThanksLetter: `http://localhost:8080/api/users/thanks-letters`,
  thanksLetter: `/admin/thanks-letter`,
  thanksLetterWrite: `/thanks-letter/write`,
  thanksLetterDetail: `/thanks-letter/:id`,
  thanksLetterEdit: `/thanks-letter/edit/:id`,
  thanksLetterDelete: `http://localhost:8080/api/users/thanks-letter/delete`,

  proclamation: `/admin/proclamation`,
  newFamily: `/admin/new-family`,
  newFamilyDetail: `/admin/new-family/:id`,
  newFamilyEdit: `/admin/new-family/edit/:id`,
  newFamilyWriting: `/admin/new-family/writing`,
  notification: `/admin/notification`,
  notificationDetail: `/admin/notification/:id`,
  notificationWriting: `/admin/notification/writing`,
  notificationEdit: `/admin/notification/edit/:id`,
};

export const RoutesText = {
  homeText: `홈`,
  myPageText: `내정보`,
  loginText: `로그인`,
  signUpText: `회원가입`,
  logoutText: `로그아웃`,
  worshipManagementText: `예배관리`,
  worshipGuideText: `예배안내`,
  prayRequestText: `기도요청`,
  graceSharingText: `은혜공유`,
  thanksLetterText: `감사편지`,
  proclamationText: `매일선포`,
  newFamilyText: `새가족`,
  notificationText: `공지관리`,
};
