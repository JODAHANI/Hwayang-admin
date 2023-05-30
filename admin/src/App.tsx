import React from "react";
import { Routes } from "./constants/routeItems";
import { Switch, Route } from "react-router-dom";

import Login from "./Components/pages/Login/Login";
import Auth from "./Components/Hoc/Auth";
import AdminHome from "Components/pages/AdminHome/AdminHome";
import SignUp from "Components/pages/SignUp/SignUp";
import Proclamation from "Components/pages/Proclamation/Proclamation";

import WorshipManagement from "Components/pages/WorshipManagement/WorshipManagement";
import WorshipManagementDetail from "Components/pages/WorshipManagement/WorshipManagementDetail/WorshipManagementDetail";

import NewFamily from "Components/pages/NewFamily/NewFamily";
import NewFamilyWriting from "Components/pages/NewFamily/NewFamilyWriting/NewFamilyWriting";
import NewFamilyDetail from "Components/pages/NewFamily/NewFamilyDetail/NewFamilyDetail";
import NewFamilyEdit from "Components/pages/NewFamily/NewFamilyEdit/NewFamilyEdit";

import ThanksLetter from "Components/pages/ThanksLetter/ThanksLetter";
import ThanksLetterDetail from "Components/pages/ThanksLetter/ThanksLetterDetail/ThanksLetterDetail";

import GraceSharing from "Components/pages/GraceSharing/GraceSharing";
import GraceSharingDetail from "Components/pages/GraceSharing/GraceSharingDetail/GraceSharingDetail";

import PrayRequest from "Components/pages/PrayRequest/PrayRequest";
import PrayRequestDetail from "Components/pages/PrayRequest/PrayRequestDetail/PrayRequestDetail";

import Notification from "Components/pages/Notification/Notification";
import Writing from "Components/pages/Notification/Writing/Writing";
import NotificationDetail from "Components/pages/Notification/NotificationDetail/NotificationDetail";
import NotificationEdit from "Components/pages/Notification/NotificationEdit/NotificationEdit";
import Header from "./Components/layout/Header/Header";

const {
  home,
  login,
  signUp,
  // logout,
  worshipManagement,
  prayRequest,
  prayRequestDetail,
  graceSharing,
  graceSharingDetail,
  thanksLetter,
  proclamation,
  newFamily,
  notification,
  notificationWriting,
  notificationDetail,
  notificationEdit,
  newFamilyWriting,
  newFamilyDetail,
  newFamilyEdit,
  thanksLetterDetail,
  worshipDetail,
} = Routes;

const App = () => {
  return (
    <div className=" bg-white">
      <Header />
      <Switch>
        <Route exact path={"/"} component={Login} />
        <Route exact path={login} component={Auth(Login, false)} />
        <Route exact path={signUp} component={Auth(SignUp, false)} />
        <Route exact path={home} component={Auth(AdminHome, true)} />
        <Route
          exact
          path={worshipManagement}
          component={Auth(WorshipManagement, true)}
        />
        <Route
          exact
          path={worshipDetail}
          component={Auth(WorshipManagementDetail, true)}
        />
        <Route
          exact
          path={newFamilyWriting}
          component={Auth(NewFamilyWriting, true)}
        />
        <Route exact path={newFamily} component={Auth(NewFamily, true)} />
        <Route
          exact
          path={newFamilyDetail}
          component={Auth(NewFamilyDetail, true)}
        />
        <Route
          exact
          path={newFamilyEdit}
          component={Auth(NewFamilyEdit, true)}
        />

        <Route exact path={thanksLetter} component={Auth(ThanksLetter, true)} />
        <Route
          exact
          path={thanksLetterDetail}
          component={Auth(ThanksLetterDetail, true)}
        />

        <Route exact path={graceSharing} component={Auth(GraceSharing, true)} />
        <Route
          exact
          path={graceSharingDetail}
          component={Auth(GraceSharingDetail, null)}
        />
        <Route exact path={prayRequest} component={Auth(PrayRequest, true)} />
        <Route
          exact
          path={prayRequestDetail}
          component={Auth(PrayRequestDetail, true)}
        />
        <Route exact path={proclamation} component={Auth(Proclamation, true)} />
        <Route exact path={notification} component={Auth(Notification, true)} />
        <Route
          exact
          path={notificationWriting}
          component={Auth(Writing, true)}
        />
        <Route
          exact
          path={notificationDetail}
          component={Auth(NotificationDetail, true)}
        />
        <Route
          exact
          path={notificationEdit}
          component={Auth(NotificationEdit, true)}
        />
      </Switch>
    </div>
  );
};

export default App;
