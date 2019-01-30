"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typescript_1 = tslib_1.__importDefault(require("typescript"));
var path = tslib_1.__importStar(require("path"));
var tsconfig_1 = require("./tsconfig");
// tslint:disable-next-line:no-big-function
function lint(project, detail, debug, files, oldProgram) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        function collectData(node, file, sourceFile) {
            var type = checker.getTypeAtLocation(node);
            if (type) {
                var _a = typescript_1.default.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile)), line = _a.line, character = _a.character;
                totalCount++;
                if (type.flags === 1 && type.intrinsicName === 'any') {
                    if (debug) {
                        console.log("type === any: " + file + ":" + (line + 1) + ":" + (character + 1) + ": " + node.getText(sourceFile));
                    }
                    else if (detail) {
                        anys.push({ file: file, line: line, character: character, text: node.getText(sourceFile) });
                    }
                }
                else {
                    correctCount++;
                    if (debug) {
                        console.log("type !== any: " + file + ":" + (line + 1) + ":" + (character + 1) + ": " + node.getText(sourceFile) + " " + node.kind + "(kind) " + type.flags + "(flag) " + (type.intrinsicName || ''));
                    }
                }
            }
        }
        function handleNodes(nodes, file, sourceFile) {
            var e_2, _a;
            if (nodes === undefined) {
                return;
            }
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    handleNode(node, file, sourceFile);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        // tslint:disable-next-line:no-big-function
        function handleNode(node, file, sourceFile) {
            if (node === undefined) {
                return;
            }
            if (debug) {
                var _a = typescript_1.default.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile)), line = _a.line, character = _a.character;
                console.log("node: " + file + ":" + (line + 1) + ":" + (character + 1) + ": " + node.getText(sourceFile) + " " + node.kind + "(kind)");
            }
            handleNodes(node.decorators, file, sourceFile);
            handleNodes(node.modifiers, file, sourceFile);
            switch (node.kind) {
                case typescript_1.default.SyntaxKind.Unknown:
                case typescript_1.default.SyntaxKind.EndOfFileToken:
                case typescript_1.default.SyntaxKind.SingleLineCommentTrivia:
                case typescript_1.default.SyntaxKind.MultiLineCommentTrivia:
                case typescript_1.default.SyntaxKind.NewLineTrivia:
                case typescript_1.default.SyntaxKind.WhitespaceTrivia:
                case typescript_1.default.SyntaxKind.ShebangTrivia:
                case typescript_1.default.SyntaxKind.ConflictMarkerTrivia:
                case typescript_1.default.SyntaxKind.NumericLiteral:
                case typescript_1.default.SyntaxKind.StringLiteral:
                case typescript_1.default.SyntaxKind.JsxText:
                case typescript_1.default.SyntaxKind.JsxTextAllWhiteSpaces:
                case typescript_1.default.SyntaxKind.RegularExpressionLiteral:
                case typescript_1.default.SyntaxKind.NoSubstitutionTemplateLiteral:
                case typescript_1.default.SyntaxKind.TemplateHead:
                case typescript_1.default.SyntaxKind.TemplateMiddle:
                case typescript_1.default.SyntaxKind.TemplateTail:
                case typescript_1.default.SyntaxKind.OpenBraceToken:
                case typescript_1.default.SyntaxKind.CloseBraceToken:
                case typescript_1.default.SyntaxKind.OpenParenToken:
                case typescript_1.default.SyntaxKind.CloseParenToken:
                case typescript_1.default.SyntaxKind.OpenBracketToken:
                case typescript_1.default.SyntaxKind.CloseBracketToken:
                case typescript_1.default.SyntaxKind.DotToken:
                case typescript_1.default.SyntaxKind.DotDotDotToken:
                case typescript_1.default.SyntaxKind.SemicolonToken:
                case typescript_1.default.SyntaxKind.CommaToken:
                case typescript_1.default.SyntaxKind.LessThanToken:
                case typescript_1.default.SyntaxKind.LessThanSlashToken:
                case typescript_1.default.SyntaxKind.GreaterThanToken:
                case typescript_1.default.SyntaxKind.LessThanEqualsToken:
                case typescript_1.default.SyntaxKind.GreaterThanEqualsToken:
                case typescript_1.default.SyntaxKind.EqualsEqualsToken:
                case typescript_1.default.SyntaxKind.ExclamationEqualsToken:
                case typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken:
                case typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken:
                case typescript_1.default.SyntaxKind.EqualsGreaterThanToken:
                case typescript_1.default.SyntaxKind.PlusToken:
                case typescript_1.default.SyntaxKind.MinusToken:
                case typescript_1.default.SyntaxKind.AsteriskToken:
                case typescript_1.default.SyntaxKind.AsteriskAsteriskToken:
                case typescript_1.default.SyntaxKind.SlashToken:
                case typescript_1.default.SyntaxKind.PercentToken:
                case typescript_1.default.SyntaxKind.PlusPlusToken:
                case typescript_1.default.SyntaxKind.MinusMinusToken:
                case typescript_1.default.SyntaxKind.LessThanLessThanToken:
                case typescript_1.default.SyntaxKind.GreaterThanGreaterThanToken:
                case typescript_1.default.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case typescript_1.default.SyntaxKind.AmpersandToken:
                case typescript_1.default.SyntaxKind.BarToken:
                case typescript_1.default.SyntaxKind.CaretToken:
                case typescript_1.default.SyntaxKind.ExclamationToken:
                case typescript_1.default.SyntaxKind.TildeToken:
                case typescript_1.default.SyntaxKind.AmpersandAmpersandToken:
                case typescript_1.default.SyntaxKind.BarBarToken:
                case typescript_1.default.SyntaxKind.QuestionToken:
                case typescript_1.default.SyntaxKind.ColonToken:
                case typescript_1.default.SyntaxKind.AtToken:
                case typescript_1.default.SyntaxKind.EqualsToken:
                case typescript_1.default.SyntaxKind.PlusEqualsToken:
                case typescript_1.default.SyntaxKind.MinusEqualsToken:
                case typescript_1.default.SyntaxKind.AsteriskEqualsToken:
                case typescript_1.default.SyntaxKind.AsteriskAsteriskEqualsToken:
                case typescript_1.default.SyntaxKind.SlashEqualsToken:
                case typescript_1.default.SyntaxKind.PercentEqualsToken:
                case typescript_1.default.SyntaxKind.LessThanLessThanEqualsToken:
                case typescript_1.default.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case typescript_1.default.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case typescript_1.default.SyntaxKind.AmpersandEqualsToken:
                case typescript_1.default.SyntaxKind.BarEqualsToken:
                case typescript_1.default.SyntaxKind.CaretEqualsToken:
                    break;
                case typescript_1.default.SyntaxKind.Identifier:
                    collectData(node, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.BreakKeyword:
                case typescript_1.default.SyntaxKind.CaseKeyword:
                case typescript_1.default.SyntaxKind.CatchKeyword:
                case typescript_1.default.SyntaxKind.ClassKeyword:
                case typescript_1.default.SyntaxKind.ConstKeyword:
                case typescript_1.default.SyntaxKind.ContinueKeyword:
                case typescript_1.default.SyntaxKind.DebuggerKeyword:
                case typescript_1.default.SyntaxKind.DefaultKeyword:
                case typescript_1.default.SyntaxKind.DeleteKeyword:
                case typescript_1.default.SyntaxKind.DoKeyword:
                case typescript_1.default.SyntaxKind.ElseKeyword:
                case typescript_1.default.SyntaxKind.EnumKeyword:
                case typescript_1.default.SyntaxKind.ExportKeyword:
                case typescript_1.default.SyntaxKind.ExtendsKeyword:
                case typescript_1.default.SyntaxKind.FalseKeyword:
                case typescript_1.default.SyntaxKind.FinallyKeyword:
                case typescript_1.default.SyntaxKind.ForKeyword:
                case typescript_1.default.SyntaxKind.FunctionKeyword:
                case typescript_1.default.SyntaxKind.IfKeyword:
                case typescript_1.default.SyntaxKind.ImportKeyword:
                case typescript_1.default.SyntaxKind.InKeyword:
                case typescript_1.default.SyntaxKind.InstanceOfKeyword:
                case typescript_1.default.SyntaxKind.NewKeyword:
                case typescript_1.default.SyntaxKind.NullKeyword:
                case typescript_1.default.SyntaxKind.ReturnKeyword:
                case typescript_1.default.SyntaxKind.SuperKeyword:
                case typescript_1.default.SyntaxKind.SwitchKeyword:
                    break;
                case typescript_1.default.SyntaxKind.ThisKeyword:
                    collectData(node, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ThrowKeyword:
                case typescript_1.default.SyntaxKind.TrueKeyword:
                case typescript_1.default.SyntaxKind.TryKeyword:
                case typescript_1.default.SyntaxKind.TypeOfKeyword:
                case typescript_1.default.SyntaxKind.VarKeyword:
                case typescript_1.default.SyntaxKind.VoidKeyword:
                case typescript_1.default.SyntaxKind.WhileKeyword:
                case typescript_1.default.SyntaxKind.WithKeyword:
                case typescript_1.default.SyntaxKind.ImplementsKeyword:
                case typescript_1.default.SyntaxKind.InterfaceKeyword:
                case typescript_1.default.SyntaxKind.LetKeyword:
                case typescript_1.default.SyntaxKind.PackageKeyword:
                case typescript_1.default.SyntaxKind.PrivateKeyword:
                case typescript_1.default.SyntaxKind.ProtectedKeyword:
                case typescript_1.default.SyntaxKind.PublicKeyword:
                case typescript_1.default.SyntaxKind.StaticKeyword:
                case typescript_1.default.SyntaxKind.YieldKeyword:
                case typescript_1.default.SyntaxKind.AbstractKeyword:
                case typescript_1.default.SyntaxKind.AsKeyword:
                case typescript_1.default.SyntaxKind.AnyKeyword:
                case typescript_1.default.SyntaxKind.AsyncKeyword:
                case typescript_1.default.SyntaxKind.AwaitKeyword:
                case typescript_1.default.SyntaxKind.BooleanKeyword:
                case typescript_1.default.SyntaxKind.ConstructorKeyword:
                case typescript_1.default.SyntaxKind.DeclareKeyword:
                case typescript_1.default.SyntaxKind.GetKeyword:
                case typescript_1.default.SyntaxKind.IsKeyword:
                case typescript_1.default.SyntaxKind.KeyOfKeyword:
                case typescript_1.default.SyntaxKind.ModuleKeyword:
                case typescript_1.default.SyntaxKind.NamespaceKeyword:
                case typescript_1.default.SyntaxKind.NeverKeyword:
                case typescript_1.default.SyntaxKind.ReadonlyKeyword:
                case typescript_1.default.SyntaxKind.RequireKeyword:
                case typescript_1.default.SyntaxKind.NumberKeyword:
                case typescript_1.default.SyntaxKind.ObjectKeyword:
                case typescript_1.default.SyntaxKind.SetKeyword:
                case typescript_1.default.SyntaxKind.StringKeyword:
                case typescript_1.default.SyntaxKind.SymbolKeyword:
                case typescript_1.default.SyntaxKind.TypeKeyword:
                case typescript_1.default.SyntaxKind.UndefinedKeyword:
                case typescript_1.default.SyntaxKind.UniqueKeyword:
                case typescript_1.default.SyntaxKind.UnknownKeyword:
                case typescript_1.default.SyntaxKind.FromKeyword:
                case typescript_1.default.SyntaxKind.GlobalKeyword:
                case typescript_1.default.SyntaxKind.BigIntKeyword:
                case typescript_1.default.SyntaxKind.OfKeyword:
                    break;
                case typescript_1.default.SyntaxKind.QualifiedName:
                    var qualifiedName = node;
                    handleNode(qualifiedName.left, file, sourceFile);
                    handleNode(qualifiedName.right, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ComputedPropertyName:
                    var computedPropertyName = node;
                    handleNode(computedPropertyName.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeParameter:
                    var typeParameterDeclaration = node;
                    handleNode(typeParameterDeclaration.name, file, sourceFile);
                    handleNode(typeParameterDeclaration.default, file, sourceFile);
                    handleNode(typeParameterDeclaration.expression, file, sourceFile);
                    handleNode(typeParameterDeclaration.constraint, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.Parameter:
                    var parameterDeclaration = node;
                    handleNode(parameterDeclaration.dotDotDotToken, file, sourceFile);
                    handleNode(parameterDeclaration.name, file, sourceFile);
                    handleNode(parameterDeclaration.initializer, file, sourceFile);
                    handleNode(parameterDeclaration.type, file, sourceFile);
                    handleNode(parameterDeclaration.questionToken, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.Decorator:
                    var decorator = node;
                    handleNode(decorator.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.PropertySignature:
                    var propertySignature = node;
                    handleNode(propertySignature.name, file, sourceFile);
                    handleNode(propertySignature.questionToken, file, sourceFile);
                    handleNode(propertySignature.type, file, sourceFile);
                    handleNode(propertySignature.initializer, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.PropertyDeclaration:
                    var propertyDeclaration = node;
                    handleNode(propertyDeclaration.name, file, sourceFile);
                    handleNode(propertyDeclaration.initializer, file, sourceFile);
                    handleNode(propertyDeclaration.type, file, sourceFile);
                    handleNode(propertyDeclaration.questionToken, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.MethodSignature:
                    var methodSignature = node;
                    handleNode(methodSignature.name, file, sourceFile);
                    handleNodes(methodSignature.parameters, file, sourceFile);
                    handleNode(methodSignature.questionToken, file, sourceFile);
                    handleNode(methodSignature.type, file, sourceFile);
                    handleNodes(methodSignature.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.MethodDeclaration:
                case typescript_1.default.SyntaxKind.Constructor:
                case typescript_1.default.SyntaxKind.GetAccessor:
                case typescript_1.default.SyntaxKind.SetAccessor:
                    var functionLikeDeclarationBase = node;
                    handleNode(functionLikeDeclarationBase.name, file, sourceFile);
                    handleNodes(functionLikeDeclarationBase.parameters, file, sourceFile);
                    handleNode(functionLikeDeclarationBase.body, file, sourceFile);
                    handleNode(functionLikeDeclarationBase.asteriskToken, file, sourceFile);
                    handleNode(functionLikeDeclarationBase.questionToken, file, sourceFile);
                    handleNode(functionLikeDeclarationBase.type, file, sourceFile);
                    handleNodes(functionLikeDeclarationBase.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.CallSignature:
                    var callSignatureDeclaration = node;
                    handleNode(callSignatureDeclaration.name, file, sourceFile);
                    handleNodes(callSignatureDeclaration.parameters, file, sourceFile);
                    handleNode(callSignatureDeclaration.questionToken, file, sourceFile);
                    handleNode(callSignatureDeclaration.type, file, sourceFile);
                    handleNodes(callSignatureDeclaration.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ConstructSignature:
                    var constructSignatureDeclaration = node;
                    handleNode(constructSignatureDeclaration.name, file, sourceFile);
                    handleNodes(constructSignatureDeclaration.parameters, file, sourceFile);
                    handleNode(constructSignatureDeclaration.questionToken, file, sourceFile);
                    handleNode(constructSignatureDeclaration.type, file, sourceFile);
                    handleNodes(constructSignatureDeclaration.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.IndexSignature:
                    var indexSignatureDeclaration = node;
                    handleNode(indexSignatureDeclaration.name, file, sourceFile);
                    handleNodes(indexSignatureDeclaration.parameters, file, sourceFile);
                    handleNode(indexSignatureDeclaration.questionToken, file, sourceFile);
                    handleNode(indexSignatureDeclaration.type, file, sourceFile);
                    handleNodes(indexSignatureDeclaration.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypePredicate:
                    var typePredicateNode = node;
                    handleNode(typePredicateNode.type, file, sourceFile);
                    handleNode(typePredicateNode.parameterName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeReference:
                    var typeReferenceNode = node;
                    handleNode(typeReferenceNode.typeName, file, sourceFile);
                    handleNodes(typeReferenceNode.typeArguments, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.FunctionType:
                case typescript_1.default.SyntaxKind.ConstructorType:
                    var signatureDeclarationBase = node;
                    handleNode(signatureDeclarationBase.name, file, sourceFile);
                    handleNodes(signatureDeclarationBase.parameters, file, sourceFile);
                    handleNode(signatureDeclarationBase.type, file, sourceFile);
                    handleNodes(signatureDeclarationBase.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeQuery:
                    var typeQueryNode = node;
                    handleNode(typeQueryNode.exprName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeLiteral:
                    var typeLiteralNode = node;
                    handleNodes(typeLiteralNode.members, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ArrayType:
                    var arrayTypeNode = node;
                    handleNode(arrayTypeNode.elementType, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TupleType:
                    var tupleTypeNode = node;
                    handleNodes(tupleTypeNode.elementTypes, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.OptionalType:
                    break;
                case typescript_1.default.SyntaxKind.RestType:
                    var restTypeNode = node;
                    handleNode(restTypeNode.type, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.UnionType:
                    var unionTypeNode = node;
                    handleNodes(unionTypeNode.types, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.IntersectionType:
                    var intersectionTypeNode = node;
                    handleNodes(intersectionTypeNode.types, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ConditionalType:
                    var conditionalTypeNode = node;
                    handleNode(conditionalTypeNode.checkType, file, sourceFile);
                    handleNode(conditionalTypeNode.extendsType, file, sourceFile);
                    handleNode(conditionalTypeNode.trueType, file, sourceFile);
                    handleNode(conditionalTypeNode.falseType, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.InferType:
                    var inferTypeNode = node;
                    handleNode(inferTypeNode.typeParameter, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ParenthesizedType:
                    var parenthesizedTypeNode = node;
                    handleNode(parenthesizedTypeNode.type, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ThisType:
                    break;
                case typescript_1.default.SyntaxKind.TypeOperator:
                    var typeOperatorNode = node;
                    handleNode(typeOperatorNode.type, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.IndexedAccessType:
                    var indexedAccessTypeNode = node;
                    handleNode(indexedAccessTypeNode.objectType, file, sourceFile);
                    handleNode(indexedAccessTypeNode.indexType, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.MappedType:
                    var mappedTypeNode = node;
                    handleNode(mappedTypeNode.questionToken, file, sourceFile);
                    handleNode(mappedTypeNode.readonlyToken, file, sourceFile);
                    handleNode(mappedTypeNode.type, file, sourceFile);
                    handleNode(mappedTypeNode.typeParameter, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.LiteralType:
                    var literalTypeNode = node;
                    handleNode(literalTypeNode.literal, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ImportType:
                    var importTypeNode = node;
                    handleNode(importTypeNode.qualifier, file, sourceFile);
                    handleNode(importTypeNode.argument, file, sourceFile);
                    handleNodes(importTypeNode.typeArguments, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ObjectBindingPattern:
                    var objectBindingPattern = node;
                    handleNodes(objectBindingPattern.elements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ArrayBindingPattern:
                    var arrayBindingPattern = node;
                    handleNodes(arrayBindingPattern.elements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.BindingElement:
                    var bindingElement = node;
                    handleNode(bindingElement.name, file, sourceFile);
                    handleNode(bindingElement.initializer, file, sourceFile);
                    handleNode(bindingElement.dotDotDotToken, file, sourceFile);
                    handleNode(bindingElement.propertyName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ArrayLiteralExpression:
                    var arrayLiteralExpression = node;
                    handleNodes(arrayLiteralExpression.elements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ObjectLiteralExpression:
                    var objectLiteralExpression = node;
                    handleNodes(objectLiteralExpression.properties, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.PropertyAccessExpression:
                    var propertyAccessExpression = node;
                    handleNode(propertyAccessExpression.expression, file, sourceFile);
                    handleNode(propertyAccessExpression.name, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ElementAccessExpression:
                    var elementAccessExpression = node;
                    handleNode(elementAccessExpression.expression, file, sourceFile);
                    handleNode(elementAccessExpression.argumentExpression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.CallExpression:
                    var callExpression = node;
                    handleNode(callExpression.expression, file, sourceFile);
                    handleNodes(callExpression.arguments, file, sourceFile);
                    handleNodes(callExpression.typeArguments, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.NewExpression:
                    var newExpression = node;
                    handleNode(newExpression.expression, file, sourceFile);
                    handleNodes(newExpression.arguments, file, sourceFile);
                    handleNodes(newExpression.typeArguments, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TaggedTemplateExpression:
                    var taggedTemplateExpression = node;
                    handleNode(taggedTemplateExpression.template, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeAssertionExpression:
                    var typeAssertion = node;
                    handleNode(typeAssertion.expression, file, sourceFile);
                    handleNode(typeAssertion.type, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ParenthesizedExpression:
                    var parenthesizedExpression = node;
                    handleNode(parenthesizedExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.FunctionExpression:
                    var functionExpression = node;
                    handleNode(functionExpression.name, file, sourceFile);
                    handleNodes(functionExpression.parameters, file, sourceFile);
                    handleNode(functionExpression.body, file, sourceFile);
                    handleNode(functionExpression.asteriskToken, file, sourceFile);
                    handleNode(functionExpression.questionToken, file, sourceFile);
                    handleNode(functionExpression.type, file, sourceFile);
                    handleNodes(functionExpression.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ArrowFunction:
                    var arrowFunction = node;
                    handleNode(arrowFunction.name, file, sourceFile);
                    handleNodes(arrowFunction.parameters, file, sourceFile);
                    handleNode(arrowFunction.body, file, sourceFile);
                    handleNode(arrowFunction.asteriskToken, file, sourceFile);
                    handleNode(arrowFunction.questionToken, file, sourceFile);
                    handleNode(arrowFunction.type, file, sourceFile);
                    handleNodes(arrowFunction.typeParameters, file, sourceFile);
                    handleNode(arrowFunction.equalsGreaterThanToken, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.DeleteExpression:
                    var deleteExpression = node;
                    handleNode(deleteExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeOfExpression:
                    var typeOfExpression = node;
                    handleNode(typeOfExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.VoidExpression:
                    var voidExpression = node;
                    handleNode(voidExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.AwaitExpression:
                    var awaitExpression = node;
                    handleNode(awaitExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.PrefixUnaryExpression:
                    var prefixUnaryExpression = node;
                    handleNode(prefixUnaryExpression.operand, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.PostfixUnaryExpression:
                    var postfixUnaryExpression = node;
                    handleNode(postfixUnaryExpression.operand, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.BinaryExpression:
                    var binaryExpression = node;
                    handleNode(binaryExpression.left, file, sourceFile);
                    handleNode(binaryExpression.right, file, sourceFile);
                    handleNode(binaryExpression.operatorToken, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ConditionalExpression:
                    var conditionalExpression = node;
                    handleNode(conditionalExpression.condition, file, sourceFile);
                    handleNode(conditionalExpression.colonToken, file, sourceFile);
                    handleNode(conditionalExpression.questionToken, file, sourceFile);
                    handleNode(conditionalExpression.whenTrue, file, sourceFile);
                    handleNode(conditionalExpression.whenFalse, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TemplateExpression:
                    var templateExpression = node;
                    handleNodes(templateExpression.templateSpans, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.YieldExpression:
                    var yieldExpression = node;
                    handleNode(yieldExpression.asteriskToken, file, sourceFile);
                    handleNode(yieldExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.SpreadElement:
                    var spreadElement = node;
                    handleNode(spreadElement.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ClassExpression:
                    var classExpression = node;
                    handleNode(classExpression.name, file, sourceFile);
                    handleNodes(classExpression.typeParameters, file, sourceFile);
                    handleNodes(classExpression.members, file, sourceFile);
                    handleNodes(classExpression.heritageClauses, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.OmittedExpression:
                    break;
                case typescript_1.default.SyntaxKind.ExpressionWithTypeArguments:
                    var expressionWithTypeArguments = node;
                    handleNode(expressionWithTypeArguments.expression, file, sourceFile);
                    handleNodes(expressionWithTypeArguments.typeArguments, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.AsExpression:
                    var asExpression = node;
                    handleNode(asExpression.expression, file, sourceFile);
                    handleNode(asExpression.type, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.NonNullExpression:
                    var nonNullExpression = node;
                    handleNode(nonNullExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.MetaProperty:
                    var metaProperty = node;
                    handleNode(metaProperty.name, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TemplateSpan:
                    var templateSpan = node;
                    handleNode(templateSpan.expression, file, sourceFile);
                    handleNode(templateSpan.literal, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.SemicolonClassElement:
                    var semicolonClassElement = node;
                    handleNode(semicolonClassElement.name, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.Block:
                    var block = node;
                    handleNodes(block.statements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.VariableStatement:
                    var variableStatement = node;
                    handleNode(variableStatement.declarationList, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.EmptyStatement:
                    break;
                case typescript_1.default.SyntaxKind.ExpressionStatement:
                    var expressionStatement = node;
                    handleNode(expressionStatement.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.IfStatement:
                    var ifStatement = node;
                    handleNode(ifStatement.expression, file, sourceFile);
                    handleNode(ifStatement.thenStatement, file, sourceFile);
                    handleNode(ifStatement.elseStatement, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.DoStatement:
                    var doStatement = node;
                    handleNode(doStatement.expression, file, sourceFile);
                    handleNode(doStatement.statement, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.WhileStatement:
                    var whileStatement = node;
                    handleNode(whileStatement.statement, file, sourceFile);
                    handleNode(whileStatement.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ForStatement:
                    var forStatement = node;
                    handleNode(forStatement.initializer, file, sourceFile);
                    handleNode(forStatement.condition, file, sourceFile);
                    handleNode(forStatement.incrementor, file, sourceFile);
                    handleNode(forStatement.statement, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ForInStatement:
                    var forInStatement = node;
                    handleNode(forInStatement.initializer, file, sourceFile);
                    handleNode(forInStatement.expression, file, sourceFile);
                    handleNode(forInStatement.statement, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ForOfStatement:
                    var forOfStatement = node;
                    handleNode(forOfStatement.initializer, file, sourceFile);
                    handleNode(forOfStatement.statement, file, sourceFile);
                    handleNode(forOfStatement.expression, file, sourceFile);
                    handleNode(forOfStatement.awaitModifier, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ContinueStatement:
                case typescript_1.default.SyntaxKind.BreakStatement:
                    break;
                case typescript_1.default.SyntaxKind.ReturnStatement:
                    var returnStatement = node;
                    handleNode(returnStatement.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.WithStatement:
                    var withStatement = node;
                    handleNode(withStatement.expression, file, sourceFile);
                    handleNode(withStatement.statement, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.SwitchStatement:
                    var switchStatement = node;
                    handleNode(switchStatement.expression, file, sourceFile);
                    handleNode(switchStatement.caseBlock, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.LabeledStatement:
                    var labeledStatement = node;
                    handleNode(labeledStatement.label, file, sourceFile);
                    handleNode(labeledStatement.statement, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ThrowStatement:
                    var throwStatement = node;
                    handleNode(throwStatement.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TryStatement:
                    var tryStatement = node;
                    handleNode(tryStatement.tryBlock, file, sourceFile);
                    handleNode(tryStatement.catchClause, file, sourceFile);
                    handleNode(tryStatement.finallyBlock, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.DebuggerStatement:
                    break;
                case typescript_1.default.SyntaxKind.VariableDeclaration:
                    var variableDeclaration = node;
                    handleNode(variableDeclaration.name, file, sourceFile);
                    handleNode(variableDeclaration.type, file, sourceFile);
                    handleNode(variableDeclaration.initializer, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.VariableDeclarationList:
                    var declarationList = node;
                    handleNodes(declarationList.declarations, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.FunctionDeclaration:
                    var functionDeclaration = node;
                    handleNode(functionDeclaration.name, file, sourceFile);
                    handleNodes(functionDeclaration.parameters, file, sourceFile);
                    handleNode(functionDeclaration.body, file, sourceFile);
                    handleNode(functionDeclaration.asteriskToken, file, sourceFile);
                    handleNode(functionDeclaration.questionToken, file, sourceFile);
                    handleNode(functionDeclaration.type, file, sourceFile);
                    handleNodes(functionDeclaration.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ClassDeclaration:
                    var classDeclaration = node;
                    handleNode(classDeclaration.name, file, sourceFile);
                    handleNodes(classDeclaration.members, file, sourceFile);
                    handleNodes(classDeclaration.typeParameters, file, sourceFile);
                    handleNodes(classDeclaration.heritageClauses, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.InterfaceDeclaration:
                    var interfaceDeclaration = node;
                    handleNode(interfaceDeclaration.name, file, sourceFile);
                    handleNodes(interfaceDeclaration.members, file, sourceFile);
                    handleNodes(interfaceDeclaration.typeParameters, file, sourceFile);
                    handleNodes(interfaceDeclaration.heritageClauses, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.TypeAliasDeclaration:
                    var typeAliasDeclaration = node;
                    handleNode(typeAliasDeclaration.name, file, sourceFile);
                    handleNode(typeAliasDeclaration.type, file, sourceFile);
                    handleNodes(typeAliasDeclaration.typeParameters, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.EnumDeclaration:
                    var enumDeclaration = node;
                    handleNode(enumDeclaration.name, file, sourceFile);
                    handleNodes(enumDeclaration.members, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ModuleDeclaration:
                    var moduleDeclaration = node;
                    handleNode(moduleDeclaration.name, file, sourceFile);
                    handleNode(moduleDeclaration.body, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ModuleBlock:
                    var moduleBlock = node;
                    handleNodes(moduleBlock.statements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.CaseBlock:
                    var caseBlock = node;
                    handleNodes(caseBlock.clauses, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.NamespaceExportDeclaration:
                    var namespaceExportDeclaration = node;
                    handleNode(namespaceExportDeclaration.name, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ImportEqualsDeclaration:
                    var importEqualsDeclaration = node;
                    handleNode(importEqualsDeclaration.name, file, sourceFile);
                    handleNode(importEqualsDeclaration.moduleReference, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ImportDeclaration:
                    var importDeclaration = node;
                    handleNode(importDeclaration.importClause, file, sourceFile);
                    handleNode(importDeclaration.moduleSpecifier, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ImportClause:
                    var importClause = node;
                    handleNode(importClause.name, file, sourceFile);
                    handleNode(importClause.namedBindings, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.NamespaceImport:
                    var namespaceImport = node;
                    handleNode(namespaceImport.name, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.NamedImports:
                    var namedImports = node;
                    handleNodes(namedImports.elements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ImportSpecifier:
                    var importSpecifier = node;
                    handleNode(importSpecifier.name, file, sourceFile);
                    handleNode(importSpecifier.propertyName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ExportAssignment:
                    var exportAssignment = node;
                    handleNode(exportAssignment.name, file, sourceFile);
                    handleNode(exportAssignment.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ExportDeclaration:
                    var exportDeclaration = node;
                    handleNode(exportDeclaration.exportClause, file, sourceFile);
                    handleNode(exportDeclaration.name, file, sourceFile);
                    handleNode(exportDeclaration.moduleSpecifier, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.NamedExports:
                    var namedExports = node;
                    handleNodes(namedExports.elements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ExportSpecifier:
                    var exportSpecifier = node;
                    handleNode(exportSpecifier.name, file, sourceFile);
                    handleNode(exportSpecifier.propertyName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.MissingDeclaration:
                    var missingDeclaration = node;
                    handleNode(missingDeclaration.name, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ExternalModuleReference:
                    var externalModuleReference = node;
                    handleNode(externalModuleReference.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxElement:
                    var jsxElement = node;
                    handleNode(jsxElement.openingElement, file, sourceFile);
                    handleNode(jsxElement.closingElement, file, sourceFile);
                    handleNodes(jsxElement.children, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxSelfClosingElement:
                    var jsxSelfClosingElement = node;
                    handleNode(jsxSelfClosingElement.attributes, file, sourceFile);
                    handleNode(jsxSelfClosingElement.tagName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxOpeningElement:
                    var jsxOpeningElement = node;
                    handleNode(jsxOpeningElement.attributes, file, sourceFile);
                    handleNode(jsxOpeningElement.tagName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxClosingElement:
                    var jsxClosingElement = node;
                    handleNode(jsxClosingElement.tagName, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxFragment:
                    var jsxFragment = node;
                    handleNode(jsxFragment.openingFragment, file, sourceFile);
                    handleNode(jsxFragment.closingFragment, file, sourceFile);
                    handleNodes(jsxFragment.children, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxOpeningFragment:
                    break;
                case typescript_1.default.SyntaxKind.JsxClosingFragment:
                    break;
                case typescript_1.default.SyntaxKind.JsxAttribute:
                    var jsxAttribute = node;
                    handleNode(jsxAttribute.name, file, sourceFile);
                    handleNode(jsxAttribute.initializer, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxAttributes:
                    var jsxAttributes = node;
                    handleNodes(jsxAttributes.properties, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxSpreadAttribute:
                    var jsxSpreadAttribute = node;
                    handleNode(jsxSpreadAttribute.name, file, sourceFile);
                    handleNode(jsxSpreadAttribute.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.JsxExpression:
                    var jsxExpression = node;
                    handleNode(jsxExpression.dotDotDotToken, file, sourceFile);
                    handleNode(jsxExpression.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.CaseClause:
                    var caseClause = node;
                    handleNodes(caseClause.statements, file, sourceFile);
                    handleNode(caseClause.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.DefaultClause:
                    var defaultClause = node;
                    handleNodes(defaultClause.statements, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.HeritageClause:
                    var heritageClause = node;
                    handleNodes(heritageClause.types, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.CatchClause:
                    var catchClause = node;
                    handleNode(catchClause.variableDeclaration, file, sourceFile);
                    handleNode(catchClause.block, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.PropertyAssignment:
                    var propertyAssignmentExpression = node;
                    handleNode(propertyAssignmentExpression.name, file, sourceFile);
                    handleNode(propertyAssignmentExpression.questionToken, file, sourceFile);
                    handleNode(propertyAssignmentExpression.initializer, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.ShorthandPropertyAssignment:
                    var shorthandPropertyAssignment = node;
                    handleNode(shorthandPropertyAssignment.name, file, sourceFile);
                    handleNode(shorthandPropertyAssignment.questionToken, file, sourceFile);
                    handleNode(shorthandPropertyAssignment.equalsToken, file, sourceFile);
                    handleNode(shorthandPropertyAssignment.objectAssignmentInitializer, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.SpreadAssignment:
                    var spreadAssignment = node;
                    handleNode(spreadAssignment.name, file, sourceFile);
                    handleNode(spreadAssignment.expression, file, sourceFile);
                    break;
                case typescript_1.default.SyntaxKind.EnumMember:
                case typescript_1.default.SyntaxKind.SourceFile:
                case typescript_1.default.SyntaxKind.Bundle:
                case typescript_1.default.SyntaxKind.JSDocTypeExpression:
                case typescript_1.default.SyntaxKind.JSDocAllType:
                case typescript_1.default.SyntaxKind.JSDocUnknownType:
                case typescript_1.default.SyntaxKind.JSDocNullableType:
                case typescript_1.default.SyntaxKind.JSDocNonNullableType:
                case typescript_1.default.SyntaxKind.JSDocOptionalType:
                case typescript_1.default.SyntaxKind.JSDocFunctionType:
                case typescript_1.default.SyntaxKind.JSDocVariadicType:
                case typescript_1.default.SyntaxKind.JSDocComment:
                case typescript_1.default.SyntaxKind.JSDocTag:
                case typescript_1.default.SyntaxKind.JSDocAugmentsTag:
                case typescript_1.default.SyntaxKind.JSDocClassTag:
                case typescript_1.default.SyntaxKind.JSDocParameterTag:
                case typescript_1.default.SyntaxKind.JSDocReturnTag:
                case typescript_1.default.SyntaxKind.JSDocTypeTag:
                case typescript_1.default.SyntaxKind.JSDocTemplateTag:
                case typescript_1.default.SyntaxKind.JSDocTypedefTag:
                case typescript_1.default.SyntaxKind.JSDocPropertyTag:
                case typescript_1.default.SyntaxKind.JSDocTypeLiteral:
                case typescript_1.default.SyntaxKind.SyntaxList:
                case typescript_1.default.SyntaxKind.NotEmittedStatement:
                case typescript_1.default.SyntaxKind.PartiallyEmittedExpression:
                case typescript_1.default.SyntaxKind.CommaListExpression:
                case typescript_1.default.SyntaxKind.MergeDeclarationMarker:
                case typescript_1.default.SyntaxKind.EndOfDeclarationMarker:
                case typescript_1.default.SyntaxKind.Count:
                    break;
                default:
                    console.log("warning: unhandled node kind: " + node.kind);
            }
        }
        var e_1, _a, _b, configFilePath, dirname, config, _c, compilerOptions, errors, rootNames, program, checker, correctCount, totalCount, anys, _loop_1, _d, _e, sourceFile;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _b = tsconfig_1.getTsConfigFilePath(project), configFilePath = _b.configFilePath, dirname = _b.dirname;
                    config = tsconfig_1.getTsConfig(configFilePath, dirname);
                    _c = typescript_1.default.convertCompilerOptionsFromJson(config.compilerOptions, dirname), compilerOptions = _c.options, errors = _c.errors;
                    if (errors && errors.length > 0) {
                        throw errors;
                    }
                    return [4 /*yield*/, tsconfig_1.getRootNames(config, dirname)];
                case 1:
                    rootNames = _f.sent();
                    program = typescript_1.default.createProgram(rootNames, compilerOptions, undefined, oldProgram);
                    checker = program.getTypeChecker();
                    correctCount = 0;
                    totalCount = 0;
                    anys = [];
                    _loop_1 = function (sourceFile) {
                        var file = sourceFile.fileName;
                        console.log(files);
                        if (!file.includes('node_modules')) {
                            file = path.relative(process.cwd(), file);
                            console.log('file', file);
                            console.log('input file', files);
                            console.log('sourceFile', sourceFile);
                            sourceFile.forEachChild(function (node) {
                                handleNode(node, file, sourceFile);
                            });
                        }
                    };
                    try {
                        for (_d = tslib_1.__values(program.getSourceFiles()), _e = _d.next(); !_e.done; _e = _d.next()) {
                            sourceFile = _e.value;
                            _loop_1(sourceFile);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2 /*return*/, { correctCount: correctCount, totalCount: totalCount, anys: anys, program: program }];
            }
        });
    });
}
exports.lint = lint;
