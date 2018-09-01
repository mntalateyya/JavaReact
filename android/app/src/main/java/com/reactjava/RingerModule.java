// RingerModule.java

package com.reactjava;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class RingerModule extends ReactContextBaseJavaModule {

    AudioManager am;

    public RingerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        am = (AudioManager) reactContext.getSystemService(reactContext.AUDIO_SERVICE);

        NotificationManager notificationManager =
                (NotificationManager) reactContext.getSystemService(reactContext.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                && !notificationManager.isNotificationPolicyAccessGranted())
        {
            Intent intent = new Intent(
                    android.provider.Settings
                            .ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
            reactContext.startActivity(intent);
        }
    }

    @Override
    public String getName() {
        return "RingerMode";
    }

    @ReactMethod
    public void set_silent() {
        am.setRingerMode(0);
    }

    @ReactMethod
    public void set_normal() {
        am.setRingerMode(2);
    }
}