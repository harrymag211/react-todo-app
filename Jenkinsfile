pipeline {
  agent any

  environment {
    GITHUB_REPO = 'https://github.com/harrymag211/react-todo-app.git'
    GITHUB_CREDENTIALS_ID = '93401485-4c20-49ce-b25e-66faf415ccde'
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'  // This creates the 'out' directory
        sh 'touch out/.nojekyll'
      }
    }

    stage('Deploy to GitHub Pages') {
      steps {
        dir('gh-pages') {
          deleteDir()
        }

        sh '''
          git config --global user.email "harrymag@gmail.com"
          git config --global user.name "harrymag211_Jenkins"
        '''

        withCredentials([usernamePassword(credentialsId: "${GITHUB_CREDENTIALS_ID}", usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
          sh 'git clone --branch gh-pages https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/harrymag211/react-todo-app.git gh-pages'
        }

        sh 'rm -rf gh-pages/*'
        sh 'cp -r out/. gh-pages/'

        dir('gh-pages') {
          withCredentials([usernamePassword(credentialsId: "${GITHUB_CREDENTIALS_ID}", usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
            sh '''
              git add .
              git commit -m "Deploy from Jenkins build #${BUILD_NUMBER} on \$(date)" || echo "No changes to commit"
              git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/harrymag211/react-todo-app.git gh-pages
            '''
          }
        }
      }
    }
  }
}