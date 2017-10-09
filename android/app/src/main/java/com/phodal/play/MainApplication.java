package com.phodal.play;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.photoview.PhotoViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.wonday.pdf.RCTPdfView;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.soloader.SoLoader;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new PhotoViewPackage(),
            new RNFetchBlobPackage(),
            new RCTPdfView(),
        new SplashScreenReactPackage(),
        new RNDeviceInfo(),
        new FastImageViewPackage(),
        new RNSpinkitPackage(),
        new VectorIconsPackage(),
        new GoogleAnalyticsBridgePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
