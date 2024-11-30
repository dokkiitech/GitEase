<template>
    <!-- コンテンツ -->
    <v-main>
      <v-container>
        <v-form ref="form">
          <!-- GitHubユーザー名 -->
          <v-text-field
              label="GitHubユーザー名"
              v-model="githubData.username"
              required
          ></v-text-field>

          <!-- リポジトリー名 -->
          <v-text-field
              label="リポジトリー名"
              v-model="githubData.repository"
              required
          ></v-text-field>

          <!-- ブランチ名 (任意) -->
          <v-text-field
              label="Branch名 (任意)"
              v-model="githubData.branch"
          ></v-text-field>

          <!-- コピーするボタン -->
          <v-btn @click="copyToClipboard" color="primary">クリップボードにコピー</v-btn>
        </v-form>
      </v-container>

      <!-- ポップアップメッセージ -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000">
        {{ snackbar.message }}
      </v-snackbar>
    </v-main>
</template>

<script>
export default {
  data() {
    return {
      // フォームデータを格納するオブジェクト
      githubData: {
        username: "",
        repository: "",
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
    // URLを生成し、クリップボードにコピーする処理
    copyToClipboard() {
      const {username, repository, branch} = this.githubData;

      // 入力データが不足している場合のチェック
      if (!username || !repository) {
        this.showSnackbar("GitHubユーザー名とリポジトリー名は必須です。", "red");
        return;
      }

      // フォーマットされたURL
      let formattedURL = `https://github.com/${username}/${repository}`;
      if (branch) {
        formattedURL += `/tree/${branch}`;
      }

      // クリップボードにコピー
      navigator.clipboard
          .writeText(formattedURL)
          .then(() => {
            this.showSnackbar("クリップボードにコピーしました！", "green");
          })
          .catch((err) => {
            console.error("コピーに失敗しました: ", err);
            this.showSnackbar("コピーに失敗しました。", "red");
          });
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