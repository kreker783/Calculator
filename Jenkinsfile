pipeline {
    agent any

    stages {
        stage('Source') {
            steps {
                git branch: 'main', 
                    credentialsId: '8d6d5147-81dc-4d5d-8bf6-2d8c0055c73f', 
                    url: 'https://github.com/kreker783/Calculator.git'
            }
        }

        stage('Copy code') {
            steps {
                sh "cp -R ${env.WORKSPACE}/css /var/www/html/"
                sh "cp -R ${env.WORKSPACE}/js /var/www/html/"
                sh "cp ${env.WORKSPACE}/index.html /var/www/html/"
            }
        }
    }
}
