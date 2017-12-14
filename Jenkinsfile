pipeline {
    agent {
        docker {
            image 'node:8.9.3-alpine'
            args '-p 8000:8000 -p 5000:5000'
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
