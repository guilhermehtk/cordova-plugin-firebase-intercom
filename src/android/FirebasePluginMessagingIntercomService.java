package com.roalcantara.firebase.intercom;

import java.util.Map;
import android.util.Log;

import org.apache.cordova.firebase.FirebasePluginMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import io.intercom.android.sdk.push.IntercomPushClient;

public class FirebasePluginMessagingIntercomService extends FirebasePluginMessagingService {
  private static final String TAG = "FirebaseIntercomPlugin";
  private final IntercomPushClient intercomPushClient = new IntercomPushClient();

  @Override 
  public void onNewToken(String refreshedToken) {
    this.intercomPushClient.sendTokenToIntercom(getApplication(), refreshedToken);
    super.onNewToken(refreshedToken);
  }

  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    Map message = remoteMessage.getData();
    if (this.intercomPushClient.isIntercomPush(message)) {
      this.intercomPushClient.handlePush(getApplication(), message);
      Log.d(TAG, "FirebasePluginMessagingIntercomService.onMessageReceived() HAS BEEN HANDLED BY INTERCOM! 😎");
    }
    super.onMessageReceived(remoteMessage);
  }
}