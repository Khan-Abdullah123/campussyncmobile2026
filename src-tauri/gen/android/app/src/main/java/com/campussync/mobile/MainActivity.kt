package com.campussync.mobile

import android.os.Bundle
import androidx.activity.enableEdgeToEdge

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
  }

  override fun onNewIntent(intent: android.content.Intent) {
    try {
      super.onNewIntent(intent)
    } catch (e: Exception) {
      android.util.Log.i("CampusSync", "Handled internal plugin delay: ${e.message}")
    }
  }
}
