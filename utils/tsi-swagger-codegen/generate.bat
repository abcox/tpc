REM generate client for use as npm in this typescript-angular project
REM refer to https://angular.schule/blog/2018-04-swagger-codegen
REM Download swagger-codegen-cli-2.3.1.jar from http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/
java -jar "..\swagger-codegen-cli-2.3.1.jar" generate -i https://api2.tigerpawsoftware.com/docs/18.2.1/swagger -l typescript-angular -o "C:\Users\acox\repos\tsi2" -c options.json

REM refer to https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be
REM and https://docs.npmjs.com/cli/link
cd "C:\Users\acox\repos\tsi"
npm link
cd "C:\Users\acox\repos\tpc"
npm link tsi

REM to unlink, see https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af

REM Steps to publish:
REM 1. get account on npmjs.org
REM 2. log into account, and create new org "vorba"
REM 3. cd to ..\repos\tsi
REM 4. npm install
REM 5. npm run build
REM 6. npm login
REM >username: coxad27
REM >pasword: ***
REM >email: adam.cox@vorba.com
REM 7. npm publish --access=public

