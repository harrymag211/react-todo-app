pipeline {
  agent any

  environment {
    GITHUB_REPO = 'https://github.com/harrymag211/react-todo-app.git'
    GITHUB_CREDENTIALS_ID = '93401485-4c20-49ce-b25e-66faf415ccde' // Replace with your Jenkins credentials ID
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run lint'  // Run ESLint
        sh 'npm run build'  // Output goes to build/ or dist/
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
        sh 'touch build/.nojekyll'  // Prevent Jekyll processing on GitHub Pages
        sh 'rm -rf gh-pages/*'
        sh 'cp -r build/* gh-pages/'

        dir('gh-pages') {
          withCredentials([usernamePassword(credentialsId: "${GITHUB_CREDENTIALS_ID}", usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
            sh '''
              git add .
              git commit -m "Deploy from Jenkins on $(date)"
              git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/harrymag211/react-todo-app.git gh-pages
            '''
          }
        }
      }
    }
  }
}