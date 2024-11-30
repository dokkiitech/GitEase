<template>
  <v-app>
    <!-- メニューバー -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Git Pull Generator</v-toolbar-title>
    </v-app-bar>

    <!-- コンテンツ -->
    <v-main>
      <v-container>
        <v-form ref="form">
          <!-- リモート名 -->
          <v-text-field
              label="リモート名 (例: origin)"
              v-model="gitData.remote"
              required
          ></v-text-field>

          <!-- Branch名 (任意) -->
          <v-text-field
              label="Branch名 (任意)"
              v-model="gitData.branch"
          ></v-text-field>

          <!-- コピーするボタン -->
          <v-btn @click="copyToClipboard" color="primary">Git Pull コマンドをコピー</v-btn>
        </v-form>
      </v-container>

      <!-- ポップアップメッセージ -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000">
        {{ snackbar.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      // フォームデータを格納するオブジェクト
      gitData: {
        remote: "",
        branch: "",
      },
      // Snackbarの状態管理
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
    };
  },
  methods: {
    // Git Pullコマンドを生成し、クリップボードにコピーする処理
    copyToClipboard() {
      const { remote, branch } = this.gitData;

      // 必須項目のチェック
      if (!remote) {
        this.showSnackbar("リモート名は必須です。", "red");
        return;
      }

      // Git Pull コマンドを生成
      let pullCommand = `git pull ${remote}`;
      if (branch) {
        pullCommand += ` ${branch}`;
      }

      // クリップボードにコピー
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(pullCommand.trim())
            .then(() => {
              this.showSnackbar("クリップボードにコピーしました！", "green");
            })
            .catch((err) => {
              console.error("コピーに失敗しました: ", err);
              this.showSnackbar("コピーに失敗しました。", "red");
            });
      } else {
        // フォールバック方式: テキストエリアを使用
        const textArea = document.createElement("textarea");
        textArea.value = pullCommand.trim();
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          this.showSnackbar("クリップボードにコピーしました！", "green");
        } catch (err) {
          console.error("コピーに失敗しました: ", err);
          this.showSnackbar("コピーに失敗しました。", "red");
        } finally {
          document.body.removeChild(textArea);
        }
      }
    },

    // Snackbarを表示する汎用メソッド
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>