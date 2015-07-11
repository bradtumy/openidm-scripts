/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2013-2014 ForgeRock AS. All Rights Reserved
 *
 * The contents of this file are subject to the terms
 * of the Common Development and Distribution License
 * (the License). You may not use this file except in
 * compliance with the License.
 *
 * You can obtain a copy of the License at
 * http://forgerock.org/license/CDDLv1.0.html
 * See the License for the specific language governing
 * permission and limitations under the License.
 *
 * When distributing Covered Code, include this CDDL
 * Header Notice in each file and include the License file
 * at http://forgerock.org/license/CDDLv1.0.html
 * If applicable, add the following below the CDDL Header,
 * with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 */
(

    function(){
    if (request.method === "create") {
        return {
                method: "create",
                resourceName: request.resourceName,
                newResourceId: request.newResourceId,
                parameters: request.additionalParameters,
                content: request.content,
                context: context.current
                };
    } else if (request.method === "read") {
        return {
                method: "read",
                resourceName: request.resourceName,
                parameters: request.additionalParameters,
                context: context.current
                };
    } else if (request.method === "update") {

        
        var mypass = request.content.password;
        var userid = request.resourceName;


        //logger.info("Brad: here is my pass {} ", mypass);

        return {
                mypass : mypass,
                method: "update",
                resourceName: request.resourceName,
                revision: request.revision,
                parameters: request.additionalParameters,
                content: request.content,
                context: context.current
                };
    } else if (request.method === "patch") {
        return {
                method: "patch",
                resourceName: request.resourceName,
                revision: request.revision,
                parameters: request.additionalParameters,
                patch: request.patchOperations,
                context: context.current
                };
    } else if (request.method === "query") {
        // query results must be returned as a list of maps
        return [ {
                method: "query",
                resourceName: request.resourceName,
                pagedResultsCookie: request.pagedResultsCookie,
                pagedResultsOffset: request.pagedResultsOffset,
                pageSize: request.pageSize,
                queryExpression: request.queryExpression,
                queryId: request.queryId,
                queryFilter: request.queryFilter,
                parameters: request.additionalParameters,
                content: request.content,
                context: context.current
                } ];
    } else if (request.method === "delete") {
        return {
                method: "delete",
                resourceName: request.resourceName,
                revision: request.revision,
                parameters: request.additionalParameters,
                context: context.current
                };
    } else if (request.method === "action") {

        if (request.action == "changepass") {

                var users = JSON.parse(request.content); // make sure that the request object is in JSON format and store in a local variable
                var size = Object.keys(users).length; // how many users are we updating in this request
                var userContext = "managed/user/"; // set the base context of the managed user object 

                for ( var i = 0; i < size; i++ ) {
                    // patch each user with new password
                    var uname = users[i].username;  // grab the username from the user object
                    var upass = users[i].password; // grab the new password from the user object
                    var userid = userContext+uname; 

                    var thisUser = openidm.read(userid); // check to make sure the user exists before we try and patch it.

                    if (thisUser) {
                        logger.info("Patching this user: {}", thisUser);
                        openidm.patch(userid, null, [{"operation" : "replace", "field" : "/password", "value": upass }]);
                    } else {
                        logger.info("This user doesn't exist: {}", thisUser);
                    }
                }
        }
 
        return {
            
                method: "action",
                action: request.action,
                //content: request.content,
                //parameters: request.additionalParameters,
                //context: context.current
                };
    } else {
        throw { code : 500, message : "Unknown request type " + request.method };
    }
})();


