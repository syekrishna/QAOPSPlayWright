Feature:Validation
@Validation
Scenario Outline:ErrorValidations
Given a Login to Ecommerce2 Application with "<username>" and "<password>"
Then verify the login successfully or not 

Examples:
    | username | password |
    |  Admin   | password |
    |  Admin1  | password1|
