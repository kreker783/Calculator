pipline {
    agent any

    stages {
        stage('Source') {
            staeps {
                git branch: 'main', 
                    credentialsId: '8d6d5147-81dc-4d5d-8bf6-2d8c0055c73f', 
                    url: 'https://github.com/kreker783/Calculator.git'
            }
        }

        stage('install Nginx') {
            steps {
                sh 'apt-get install nginx'
            }
        }

        stage('Copy code') {
            steps {
                sh 'cp -R /css /var/www/html/'
                sh 'cp -R /js /var/www/html/'
                sh 'cp index.html /var/www/html/'
            }
        }
    }
}