pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        APP_FOLDER = "nedii-web-app"
        REACT_APP_API_URL = sh(script: "echo ${API_URL}", , returnStdout: true).trim()
        REACT_APP_BRANCH_NAME = sh(script: "echo ${branchName}", , returnStdout: true).trim()
        REACT_APP_FACEBOOK_APP_ID = sh(script: "echo ${facebookAppID}", , returnStdout: true).trim()
        ENVT = sh(script: "echo ${ENV}", , returnStdout: true).trim()
        PUBLIC_PORT = sh(script: "echo ${PUBLIC_PORT}", , returnStdout: true).trim()
        BUILD_MOBILE_APP = sh(script: "echo ${BUILD_MOBILE_APP}", , returnStdout: true).trim()
    }
    stages {
        stage("Build & push docker image") {
            steps {
                sh "sudo docker system prune -f"
                sh "sudo docker build --build-arg REACT_APP_API_URL=$REACT_APP_API_URL --build-arg REACT_APP_BRANCH_NAME=$REACT_APP_BRANCH_NAME --build-arg REACT_APP_FACEBOOK_APP_ID=$REACT_APP_FACEBOOK_APP_ID --build-arg REACT_APP_ENVT=$ENVT -t $APP_FOLDER ."
                sh "sudo docker tag $APP_FOLDER longmont.iguzman.com.mx:5000/$APP_FOLDER:latest"
                sh "sudo docker push longmont.iguzman.com.mx:5000/$APP_FOLDER:latest"
            }
        }
        stage("Check App folders") {
            steps {
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo mkdir /$APP_FOLDER -p"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo chmod -R 777 /$APP_FOLDER"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo mkdir /$APP_FOLDER/$ENVT -p"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo chmod -R 777 /$APP_FOLDER/$ENVT"

                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo mkdir /$APP_FOLDER/$ENVT/static -p"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo chmod -R 777 /$APP_FOLDER/$ENVT/static"

                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo mkdir /$APP_FOLDER/$ENVT/assets -p"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo chmod -R 777 /$APP_FOLDER/$ENVT/assets"

                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo mkdir /config/$APP_FOLDER/$ENVT -p"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo chmod -R 777 /config/$APP_FOLDER/$ENVT"
            }
        }
        stage("Deploy container") {
            steps {
                sh "sshpass -p $SERVER_PASSWORD scp docker-compose.yaml $SERVER_USER@$SERVER:/config/$APP_FOLDER/$ENVT"
                sh "echo 'REACT_APP_API_URL=$REACT_APP_API_URL' > env"
                sh "echo 'REACT_APP_BRANCH_NAME=$REACT_APP_BRANCH_NAME' >> env"
                sh "echo 'REACT_APP_FACEBOOK_APP_ID=$REACT_APP_FACEBOOK_APP_ID' >> env"
                sh "echo 'PUBLIC_PORT=$PUBLIC_PORT' >> env"
                sh "echo 'ENVT=$ENVT' >> env"
                sh "sshpass -p $SERVER_PASSWORD scp env $SERVER_USER@$SERVER:/config/$APP_FOLDER/$ENVT/"
                sh "rm env"
            }
        }
        stage("Restart instance") {
            steps {
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo docker-compose -f /config/$APP_FOLDER/$ENVT/docker-compose.yaml down"
                sh "sshpass -p $SERVER_PASSWORD ssh $SERVER_USER@$SERVER sshpass -p $SERVER_PASSWORD sudo docker-compose --env-file /config/$APP_FOLDER/$ENVT/env -f /config/$APP_FOLDER/$ENVT/docker-compose.yaml up -d"
            }
        }

        // stage("Build Mobile App") {
        //     when {
        //         expression { BUILD_MOBILE_APP == "yes" }
        //     }
        //     environment {
        //         REACT_APP_IS_MOBILE_APP = "true"
        //     }
        //     steps {
        //         sh "npm i"
        //         sh "npm run build"
        //     }
        // }
        // stage("Builid Android App") {
        //     when {
        //         expression { BUILD_MOBILE_APP == "yes" }
        //     }
        //     steps {
        //         sh "rm -rf app"
        //         sh "cordova create app"
        //         sh "cp -r build app/"
        //         sh "rm -rf app/www"
        //         sh "mv app/build app/www"
        //         sh "./android/prepare-index.sh"
        //         sh "rm app/config.xml"
        //         sh "cp android/config.xml app/"
        //         sh "cp android/logo.png app/"
        //         sh "cp android/splash.png app/"
        //         sh "tar -cvf app.tar app/"
        //         sh "cp app.tar /$APP_FOLDER/$ENVT/static"
        //         dir("app") {
        //             sh "cordova platform add android"
        //             sh "cordova plugin add cordova-plugin-device"
        //             sh "cordova plugin add cordova-plugin-splashscreen"
        //             sh "cordova build android"
        //         }
        //         sh "cp app/platforms/android/app/build/outputs/apk/debug/app-debug.apk /$APP_FOLDER/$ENVT/static/app.apk"
        //         sh "chmod 777 /$APP_FOLDER/$ENVT/static/app.apk"
        //     }
        // }
    }
}