$accountId = "339713134071"
$roleArn = "arn:aws:iam::339713134071:role/LabRole"

Write-Host "Creating DynamoDB Tables..."
aws dynamodb create-table --table-name Users --attribute-definitions AttributeName=user_id,AttributeType=S --key-schema AttributeName=user_id,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb create-table --table-name Recipes --attribute-definitions AttributeName=recipe_id,AttributeType=S --key-schema AttributeName=recipe_id,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb create-table --table-name IngredientsPrice --attribute-definitions AttributeName=ingredient_id,AttributeType=S --key-schema AttributeName=ingredient_id,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb create-table --table-name Interactions --attribute-definitions AttributeName=interaction_id,AttributeType=S --key-schema AttributeName=interaction_id,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb create-table --table-name CookingClasses --attribute-definitions AttributeName=class_id,AttributeType=S --key-schema AttributeName=class_id,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb create-table --table-name PriceAlerts --attribute-definitions AttributeName=alert_id,AttributeType=S --key-schema AttributeName=alert_id,KeyType=HASH --billing-mode PAY_PER_REQUEST
aws dynamodb create-table --table-name ShoppingLists --attribute-definitions AttributeName=list_id,AttributeType=S --key-schema AttributeName=list_id,KeyType=HASH --billing-mode PAY_PER_REQUEST

Write-Host "Waiting for tables to become ACTIVE..."
Start-Sleep -Seconds 10

Write-Host "Zipping and Deploying Lambda Functions..."
$lambdas = @("authHandler", "searchRecipes", "getRecipeDetail", "submitRecipe", "approveRecipe", "predictPrice", "calculateKcal", "shoppingList", "cookingClass", "priceAlert")

Set-Location "C:\Users\User\.gemini\antigravity\scratch\SmartChefPro\backend\src\lambdas"

foreach ($l in $lambdas) {
    Write-Host "Deploying $l..."
    Compress-Archive -Path "$l.js" -DestinationPath "$l.zip" -Force
    
    # Try to delete if exists
    aws lambda delete-function --function-name "SmartChef_$l" 2>$null
    
    aws lambda create-function `
        --function-name "SmartChef_$l" `
        --runtime nodejs18.x `
        --role $roleArn `
        --handler "$l.handler" `
        --zip-file "fileb://$l.zip" `
        --environment "Variables={RECIPES_TABLE=Recipes,USERS_TABLE=Users,PRICES_TABLE=IngredientsPrice}"
        
    aws lambda create-function-url-config --function-name "SmartChef_$l" --auth-type NONE
    aws lambda add-permission --function-name "SmartChef_$l" --action lambda:InvokeFunctionUrl --principal "*" --statement-id FunctionURLAllowPublic
}

Write-Host "Deployment Complete!"
