pipeline {
    agent {
        docker {
<<<<<<< HEAD:jenkinsfile
<<<<<<< HEAD:Jenkinsfile
            image 'node:9.2.1-alpine'
=======
            image 'node:8.9.3'
>>>>>>> 7f3a910e3dfc7e357e9804de5079194713759928:jenkinsfile
=======
            image 'node:9.2.1-alpine'
>>>>>>> d28de86198a9eeb04b9590775fdbb4c813f12564:Jenkinsfile
            args '-p 3000:3000'
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
        stage('Deliver') {
            steps {
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/deliver.sh'
            }
        }
    }
}
