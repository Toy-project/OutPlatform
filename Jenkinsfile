pipeline {
    agent {
      docker {
        image 'node:8.9.3-alpine'
        label 'dev-container'
        args '-p 80:80'
      }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver for development') {
            when {
                branch 'dev'
            }
            steps {
              echo "Im dev"
            }
        }
        stage('Deploy for production') {
            when {
                branch 'pro'
            }
            steps {
                echo "Im pro"
            }
        }
    }
}
