// **라우트랑 텍스트는 구분해서 관리.
export const hwayang = `http://localhost:8080`;
// export const hwayang = `https://port-0-hwayang-client-server-7e6o2clhv5snco.sel4.cloudtype.app`;

// export const adminServer = `https://port-0-admin-server-7e6o2clhv5snco.sel4.cloudtype.app`;
export const adminServer = `/api/admin`;
export const adminImg = `http://localhost:9000`;

export const Routes = {
  login: `/`,
  home: `/admin`,
  myPage: `/my-page`,
  signUp: `/sign-up`,
  logout: `/logout`,
  worshipResult: `/admin/worship-result`,
  worshipGuide: `/admin/worship-guide`,

  worshipManagement: `/admin/worship-management`,
  addWorshipManagement: `${adminServer}/worship-management/add`,
  getWorshipManagement: `${adminServer}/worship-management`,
  editWorshipManagement: `${adminServer}/worship-management/edit`,
  speakerImageSave: `${adminServer}/worship/image-save`,
  worshipDetail: `/admin/worship-management/:id`,
  postWorship: `${adminServer}/worship-management`,

  getPraysRequest: `${hwayang}/api/users/prays-request`,
  getPrayRequest: `${hwayang}/api/users/pray-request`,
  prayRequest: `/admin/pray-request`,
  prayRequestDetail: `/admin/pray-request/:id`,

  getGraceSharing: `${hwayang}/api/users/grace-sharing`,
  graceSharing: `/admin/grace-sharing`,
  graceSharingWrite: `/admin/grace-sharing/write`,
  graceSharingDetail: `/admin/grace-sharing/:id`,
  graceSharingDelete: `${hwayang}/api/users/grace-sharing/delete`,
  graceImageSave: `/api/users/grace-sharing/write/image-save`,

  getThanksLetter: `${hwayang}/api/users/thanks-letters`,
  // getThanksLetter: `${hwayang}/api/users/thanks-letters`,
  thanksLetter: `/admin/thanks-letter`,
  thanksLetterWrite: `/thanks-letter/write`,
  thanksLetterDetail: `/thanks-letter/:id`,
  thanksLetterEdit: `/thanks-letter/edit/:id`,
  thanksLetterDelete: `${hwayang}/api/users/thanks-letter/delete`,

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
