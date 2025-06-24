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
        sh 'npm run lint'
        sh 'npm run build'

        // 🔧 Add .nojekyll to prevent GitHub Pages issues
        sh 'touch build/.nojekyll'
      }
    }

    stage('Deploy to GitHub Pages') {
      steps {
        dir('gh-pages') {
          deleteDir()
        }

        sh '''
          git config --global user.email "jenkins@yourdomain.com"
          git config --global user.name "Jenkins"
        '''

        // Clone only gh-pages branch
        sh 'git clone --branch gh-pages $GITHUB_REPO gh-pages'

        // Copy new build files
        sh 'rm -rf gh-pages/*'
        sh 'cp -r build/* gh-pages/'
      }

      // Git push inside gh-pages folder
      dir('gh-pages') {
        withCredentials([usernamePassword(credentialsId: GITHUB_CREDENTIALS_ID, usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
          sh '''
            git add .
            git commit -m "Deploy from Jenkins on $(date)" || echo "Nothing to commit"
            git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/harrymag211/react-todo-app.git gh-pages
          '''
        }
      }
    }
  }
}
