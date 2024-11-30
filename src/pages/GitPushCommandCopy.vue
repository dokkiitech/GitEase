<template>
  <v-app>
    <!-- メニューバー -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Git Push Generator</v-toolbar-title>
    </v-app-bar>

    <!-- コンテンツ -->
    <v-main>
      <v-container>
        <v-form ref="form">
          <!-- ユーザー名 -->
          <v-text-field
              label="GitHubユーザー名"
              v-model="gitData.username"
              required
          ></v-text-field>

          <!-- リポジトリー名 -->
          <v-text-field
              label="リポジトリー名"
              v-model="gitData.repository"
              required
          ></v-text-field>

          <!-- Branch名 (任意) -->
          <v-text-field
              label="Branch名 (任意)"
              v-model="gitData.branch"
          ></v-text-field>

          <!-- -u オプション -->
          <v-checkbox
              v-model="gitData.useUpstream"
              label="-u オプションを追加"
          ></v-checkbox>

          <!-- コピーするボタン -->
          <v-btn @click="copyToClipboard" color="primary">Git Push コマンドをコピー</v-btn>
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
        username: "",
        repository: "",
        branch: "main", // デフォルトのブランチ名
        useUpstream: false, // -u オプションのチェック状態
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
    // Git Pushコマンドを生成し、クリップボードにコピーする処理
    copyToClipboard() {
      const {username, repository, branch, useUpstream} = this.gitData;

      // 必須項目のチェック
      if (!username || !repository) {
        this.showSnackbar("ユーザー名とリポジトリ名は必須です。", "red");
        return;
      }

      // Git URLを生成
      const gitURL = `https://github.com/${username}/${repository}.git`;

      // コマンド生成
      let commands = `git push https://${username}@github.com/${username}/${repository}.git`;
      if (useUpstream) {
        commands = `
git init
git add README.md
git commit -m "first commit"
git branch -M ${branch}
git remote add origin ${gitURL}
git push -u origin ${branch}
`;
      } else if (branch) {
        commands += ` ${branch}`;
      }

      // クリップボードにコピー
      navigator.clipboard
          .writeText(commands.trim())
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