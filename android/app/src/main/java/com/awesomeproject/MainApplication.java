package com.awesomeproject;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;

import android.os.Bundle;
import android.system.ErrnoException;
import android.system.Os;
import java.io.File;
import android.util.Log;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Log.i("ReactNative","HERE");

      try {
          Log.i("ReactNative","INSIDE TRY");

          File externalFilesDir = getExternalFilesDir(null);
          String path = externalFilesDir.getAbsolutePath();
          Log.i("ReactNative","externalFilesDir=" + path);
          Log.i("ReactNative","Trying to set os env");

          Os.setenv("EXTERNAL_STORAGE", path, true);
          Log.i("ReactNative","Trying to load indy");

          System.loadLibrary("indy");
          Log.i("ReactNative","Indy loaded without errors");

      } catch (ErrnoException e) {
          Log.i("ReactNative",e.toString());
      } catch (Exception e) {
          Log.e("ReactNative",e.toString());
      }
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
