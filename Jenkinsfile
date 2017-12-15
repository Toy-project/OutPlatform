pipeline {
    agent {
        docker {
          image 'node:8.9.3-alpine'
          args '-p 80:80'
        }

        docker {
          image 'node:8.9.3-alpine'
          args '-p 5000:5000'
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
              sh './jenkins/scripts/deliver-for-development.sh'
              input message: 'Finished using the web site? (Click "Proceed" to continue)'
              sh './jenkins/scripts/kill.sh'
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
