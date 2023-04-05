pipeline {
    agent { 
        label 'Centos' 
    }

    stages {
        stage('Cleane app folder') {
            steps {
                sh 'rm -rf /var/www/html/*'
            }
        }
        
        stage('Clone repo') {
            steps {
                git branch: 'main', url: 'https://github.com/kreker783/Calculator.git'
                
                sh "cp -R /home/jenkins/workspace/Calculator/* /var/www/html"
            }
        }
        
        stage('Get status of httpd service') {
            steps {
                sh 'systemctl status httpd'
            }
        }
    }
}
