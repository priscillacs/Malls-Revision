import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { auth } from "../config/firebase";
import TabNavigator from "../navigation/TabNavigator";
import TabBarProvider from "../contexts/TabBarProvider";
import ThemeProvider from "../contexts/ThemeProvider";
import ThemeWrapper from "../components/ThemeWrapper";
import CustomStatusBar from "../components/CustomStatusBar";
export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    // <NavigationContainer>
    //   {user ? (
    //     <TabBarProvider>
    //       <AppStack />
    //     </TabBarProvider>
    //   ) : (
    //     <AuthStack />
    //   )}
    // </NavigationContainer>
    <ThemeProvider>
      <NavigationContainer>
        {user ? (
          <ThemeWrapper>
            {/* <CustomStatusBar /> */}
            <TabBarProvider>
              {/* <TabNavigator /> */}
              <AppStack />
            </TabBarProvider>
          </ThemeWrapper>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
};
