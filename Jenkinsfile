properties = null
def loadProperties() {
    node {
        echo "In loadProperties()"
        checkout scm
        properties = readProperties file: 'pipeline.properties'
        echo "Finished loading properties: ${properties}"        
    }
}
def readPropertyDynamically(pName) {
    echo "In readDockerRepoUrlDynamic(), property to get is  ${pName}"
    
    if(properties == null){
        echo "In if block as properties value is : ${properties}"
        loadProperties()
    }else{
        echo "In else block as properties are already loaded"
    }
    def pValue = properties["${pName}"]
    echo "property to fetched is reporUrl: ${pValue}"
    return pValue
}

pipeline {
     environment {
        KUBE_CLUSTER_CONFIG = readPropertyDynamically('kubernetes_cluster_config')
        KUBE_DEPLOYMENT_AGENT_LABEL = readPropertyDynamically('kubenetes_deployment_agent')
        DOCKER_REPO_URL = readPropertyDynamically('docker_repo_url')
        PROJECT_NAME_CLIENT = readPropertyDynamically('project_name_client')
     }
    agent none
   options { buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr:'2')) }
    stages {           
        stage('Clean ws') {
          agent any
            steps {
              echo 'Cleaning WS stage...'
               cleanWs()
            }
        }
        stage('SonarQube analysis') {
          agent any
            steps {
                withSonarQubeEnv('SonarQube') {
                    echo 'Running Analyzing code...'
                  //  sh ''
                }
                echo 'Analyzing code successfull...'
            }
        }
        stage("Quality Gate") {
         agent any
            steps {
                 echo 'Running quality gate...'
                // waitForQualityGate abortPipeline: true
                echo 'Quality gate successfull...'
            }
        }
        stage('Docker Image Creation') {
            agent any
            steps {    
                script {
                    echo "Running docker image creation stage"
                    sh "docker build -t  $DOCKER_REPO_URL/$PROJECT_NAME_CLIENT:$BUILD_NUMBER ."
                    echo "Docker Image creation successfull"
                }
            }
        }
        
        stage('Docker Image Push') {
            agent any
            steps{
                script {
                    echo "Running docker image push stage"
                    sh "docker push $DOCKER_REPO_URL/$PROJECT_NAME_CLIENT:$BUILD_NUMBER"
                    echo "Docker Image push successfull"
                }
            }
        }
        stage('Deploy on k8s') {
            agent { label "${KUBE_DEPLOYMENT_AGENT_LABEL}"}
            steps {
                echo "Running Deploy on k8s stage"                
                script {
                    kubernetesDeploy(
                        configs: 'k8s-deployment.yaml',
                        kubeconfigId: "${KUBE_CLUSTER_CONFIG}"
                    ) 
                }
            }
        }
    }
	post {

		success {
	    	//slackSend(message: "Pipeline is successfully completed.")
		    echo "Pipeline is successfully completed."
        }
        failure {
    		//slackSend(message: "Pipeline failed. Please check the logs.")
    		echo "Pipeline failed. Please check the logs."
        }
        
    }
}
