pipeline {
    agent any

    environment {
        GITHUB_REPO           = 'https://github.com/harrymag211/react-todo-app.git'
        GITHUB_CREDENTIALS_ID = '93401485-4c20-49ce-b25e-66faf415ccde'
        OUT_DIR               = 'out' // where next export writes static files
    }

    stages {

        /* ---------- BUILD & EXPORT ---------- */
        stage('Install & Build') {
            steps {
                sh 'npm ci'                    // reproducible, faster in CI
                sh 'npm run build'             // runs next build
                sh 'touch $OUT_DIR/.nojekyll'  // lets GitHub Pages serve _next/*
            }
        }

        /* ---------- DEPLOY ---------- */
        stage('Deploy to GitHub Pages') {
            steps {
                // fresh clone of gh-pages branch
                sh 'rm -rf gh-pages'
                withCredentials([usernamePassword(
                    credentialsId: "${GITHUB_CREDENTIALS_ID}",
                    usernameVariable: 'GIT_USERNAME',
                    passwordVariable: 'GIT_PASSWORD'
                )]) {
                    sh 'git clone --branch gh-pages https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/harrymag211/react-todo-app.git gh-pages'
                }

                // wipe previous build (preserve .git)
                sh 'find gh-pages -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +'

                // copy new build (dot‑files included)
                sh 'cp -r ${OUT_DIR}/. gh-pages/'

                // commit & push
                dir('gh-pages') {
                    sh '''
                        git config user.email "harrymag@gmail.com"
                        git config user.name  "harrymag211_Jenkins"
                    '''
                    withCredentials([usernamePassword(
                        credentialsId: "${GITHUB_CREDENTIALS_ID}",
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )]) {
                        sh '''
                            git add -A # includes deletes & dot‑files
                            git commit -m "Deploy: build #${BUILD_NUMBER} on $(date)" || echo "No changes to commit"
                            git push origin gh-pages
                        '''
                    }
                }
            }
        }
    }
}