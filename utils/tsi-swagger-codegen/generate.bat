REM generate client for use as npm in this typescript-angular project
REM refer to https://angular.schule/blog/2018-04-swagger-codegen
java -jar "..\swagger-codegen-cli-2.3.1.jar" generate -i https://api2.tigerpawsoftware.com/docs/18.2.1/swagger -l typescript-angular -o "C:\Users\acox\repos\tsi" -c options.json

REM refer to https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be
REM and https://docs.npmjs.com/cli/link
cd "C:\Users\acox\repos\tsi"
npm link
cd "C:\Users\acox\repos\tpc"
npm link tsi

REM to unlink, see https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af
