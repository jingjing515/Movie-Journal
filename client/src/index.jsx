import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Journals from "./components/Journals";
import JournalDetail from "./components/JournalDetail";
import Profile from "./components/Profile";
import OMBDPage from "./components/OMBDPage";
import NotFound from "./components/NotFound";
//import Home from "./components/Login";
import Login from "./components/Login";
import Home from "./components/Home";

import VerifyUser from "./components/VerifyUser";
import AuthDebugger from "./components/AuthDebugger";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import "./style/normalize.css";
import "./style/index.css";

const container = document.getElementById("root");

const requestedScopes = [
  "profile",
  "email",
  "read:journalitem",
  "read:user",
  "edit:journalitem",
  "edit:user",
  "delete:journalitem",
  "delete:user",
  "write:user",
  "write:journalitem",
];

function RequireAuth({ children }) {
  // const { isAuthenticated, isLoading } = useAuth0();

  // if (!isLoading && !isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
}

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route
              path="app"
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="login" element={<Login />} />
              <Route path="journals" element={<Journals />} />
              <Route path="journals/:journalId" element={<JournalDetail />} />
              <Route path="debugger" element={<AuthDebugger />} />
              <Route path="ombd" element={<OMBDPage />} />
              <Route index element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);
