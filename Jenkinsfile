pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        // stage('Run Tests') {
        //     steps {
        //         sh 'npm test -- --watchAll=false'
        //     }
        // }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
        }
    }
}
