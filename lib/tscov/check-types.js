"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var typescript_1 = tslib_1.__importDefault(require("typescript"));
var path = tslib_1.__importStar(require("path"));
var inversify_1 = require("inversify");
var ts_config_1 = require("./ts-config");
var CheckTypes = /** @class */ (function () {
    function CheckTypes(tsConfig) {
        this.tsConfig = tsConfig;
    }
    // tslint:disable-next-line:no-big-function
    CheckTypes.prototype.startLinter = function (project, detail, debug, files, oldProgram) {
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
            function handleMultipleNodes(nodes, file, sourceFile) {
                var e_2, _a;
                if (nodes === undefined) {
                    return;
                }
                try {
                    for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                        var node = nodes_1_1.value;
                        handleSingleNode(node, file, sourceFile);
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
            function handleSingleNode(node, file, sourceFile) {
                if (node === undefined) {
                    return;
                }
                if (debug) {
                    var _a = typescript_1.default.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile)), line = _a.line, character = _a.character;
                    console.log("node: " + file + ":" + (line + 1) + ":" + (character + 1) + ": " + node.getText(sourceFile) + " " + node.kind + "(kind)");
                }
                handleMultipleNodes(node.decorators, file, sourceFile);
                handleMultipleNodes(node.modifiers, file, sourceFile);
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
                        handleSingleNode(qualifiedName.left, file, sourceFile);
                        handleSingleNode(qualifiedName.right, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ComputedPropertyName:
                        var computedPropertyName = node;
                        handleSingleNode(computedPropertyName.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeParameter:
                        var typeParameterDeclaration = node;
                        handleSingleNode(typeParameterDeclaration.name, file, sourceFile);
                        handleSingleNode(typeParameterDeclaration.default, file, sourceFile);
                        handleSingleNode(typeParameterDeclaration.expression, file, sourceFile);
                        handleSingleNode(typeParameterDeclaration.constraint, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.Parameter:
                        var parameterDeclaration = node;
                        handleSingleNode(parameterDeclaration.dotDotDotToken, file, sourceFile);
                        handleSingleNode(parameterDeclaration.name, file, sourceFile);
                        handleSingleNode(parameterDeclaration.initializer, file, sourceFile);
                        handleSingleNode(parameterDeclaration.type, file, sourceFile);
                        handleSingleNode(parameterDeclaration.questionToken, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.Decorator:
                        var decorator = node;
                        handleSingleNode(decorator.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.PropertySignature:
                        var propertySignature = node;
                        handleSingleNode(propertySignature.name, file, sourceFile);
                        handleSingleNode(propertySignature.questionToken, file, sourceFile);
                        handleSingleNode(propertySignature.type, file, sourceFile);
                        handleSingleNode(propertySignature.initializer, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.PropertyDeclaration:
                        var propertyDeclaration = node;
                        handleSingleNode(propertyDeclaration.name, file, sourceFile);
                        handleSingleNode(propertyDeclaration.initializer, file, sourceFile);
                        handleSingleNode(propertyDeclaration.type, file, sourceFile);
                        handleSingleNode(propertyDeclaration.questionToken, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.MethodSignature:
                        var methodSignature = node;
                        handleSingleNode(methodSignature.name, file, sourceFile);
                        handleMultipleNodes(methodSignature.parameters, file, sourceFile);
                        handleSingleNode(methodSignature.questionToken, file, sourceFile);
                        handleSingleNode(methodSignature.type, file, sourceFile);
                        handleMultipleNodes(methodSignature.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.MethodDeclaration:
                    case typescript_1.default.SyntaxKind.Constructor:
                    case typescript_1.default.SyntaxKind.GetAccessor:
                    case typescript_1.default.SyntaxKind.SetAccessor:
                        var functionLikeDeclarationBase = node;
                        handleSingleNode(functionLikeDeclarationBase.name, file, sourceFile);
                        handleMultipleNodes(functionLikeDeclarationBase.parameters, file, sourceFile);
                        handleSingleNode(functionLikeDeclarationBase.body, file, sourceFile);
                        handleSingleNode(functionLikeDeclarationBase.asteriskToken, file, sourceFile);
                        handleSingleNode(functionLikeDeclarationBase.questionToken, file, sourceFile);
                        handleSingleNode(functionLikeDeclarationBase.type, file, sourceFile);
                        handleMultipleNodes(functionLikeDeclarationBase.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.CallSignature:
                        var callSignatureDeclaration = node;
                        handleSingleNode(callSignatureDeclaration.name, file, sourceFile);
                        handleMultipleNodes(callSignatureDeclaration.parameters, file, sourceFile);
                        handleSingleNode(callSignatureDeclaration.questionToken, file, sourceFile);
                        handleSingleNode(callSignatureDeclaration.type, file, sourceFile);
                        handleMultipleNodes(callSignatureDeclaration.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ConstructSignature:
                        var constructSignatureDeclaration = node;
                        handleSingleNode(constructSignatureDeclaration.name, file, sourceFile);
                        handleMultipleNodes(constructSignatureDeclaration.parameters, file, sourceFile);
                        handleSingleNode(constructSignatureDeclaration.questionToken, file, sourceFile);
                        handleSingleNode(constructSignatureDeclaration.type, file, sourceFile);
                        handleMultipleNodes(constructSignatureDeclaration.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.IndexSignature:
                        var indexSignatureDeclaration = node;
                        handleSingleNode(indexSignatureDeclaration.name, file, sourceFile);
                        handleMultipleNodes(indexSignatureDeclaration.parameters, file, sourceFile);
                        handleSingleNode(indexSignatureDeclaration.questionToken, file, sourceFile);
                        handleSingleNode(indexSignatureDeclaration.type, file, sourceFile);
                        handleMultipleNodes(indexSignatureDeclaration.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypePredicate:
                        var typePredicateNode = node;
                        handleSingleNode(typePredicateNode.type, file, sourceFile);
                        handleSingleNode(typePredicateNode.parameterName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeReference:
                        var typeReferenceNode = node;
                        handleSingleNode(typeReferenceNode.typeName, file, sourceFile);
                        handleMultipleNodes(typeReferenceNode.typeArguments, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.FunctionType:
                    case typescript_1.default.SyntaxKind.ConstructorType:
                        var signatureDeclarationBase = node;
                        handleSingleNode(signatureDeclarationBase.name, file, sourceFile);
                        handleMultipleNodes(signatureDeclarationBase.parameters, file, sourceFile);
                        handleSingleNode(signatureDeclarationBase.type, file, sourceFile);
                        handleMultipleNodes(signatureDeclarationBase.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeQuery:
                        var typeQueryNode = node;
                        handleSingleNode(typeQueryNode.exprName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeLiteral:
                        var typeLiteralNode = node;
                        handleMultipleNodes(typeLiteralNode.members, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ArrayType:
                        var arrayTypeNode = node;
                        handleSingleNode(arrayTypeNode.elementType, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TupleType:
                        var tupleTypeNode = node;
                        handleMultipleNodes(tupleTypeNode.elementTypes, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.OptionalType:
                        break;
                    case typescript_1.default.SyntaxKind.RestType:
                        var restTypeNode = node;
                        handleSingleNode(restTypeNode.type, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.UnionType:
                        var unionTypeNode = node;
                        handleMultipleNodes(unionTypeNode.types, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.IntersectionType:
                        var intersectionTypeNode = node;
                        handleMultipleNodes(intersectionTypeNode.types, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ConditionalType:
                        var conditionalTypeNode = node;
                        handleSingleNode(conditionalTypeNode.checkType, file, sourceFile);
                        handleSingleNode(conditionalTypeNode.extendsType, file, sourceFile);
                        handleSingleNode(conditionalTypeNode.trueType, file, sourceFile);
                        handleSingleNode(conditionalTypeNode.falseType, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.InferType:
                        var inferTypeNode = node;
                        handleSingleNode(inferTypeNode.typeParameter, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ParenthesizedType:
                        var parenthesizedTypeNode = node;
                        handleSingleNode(parenthesizedTypeNode.type, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ThisType:
                        break;
                    case typescript_1.default.SyntaxKind.TypeOperator:
                        var typeOperatorNode = node;
                        handleSingleNode(typeOperatorNode.type, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.IndexedAccessType:
                        var indexedAccessTypeNode = node;
                        handleSingleNode(indexedAccessTypeNode.objectType, file, sourceFile);
                        handleSingleNode(indexedAccessTypeNode.indexType, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.MappedType:
                        var mappedTypeNode = node;
                        handleSingleNode(mappedTypeNode.questionToken, file, sourceFile);
                        handleSingleNode(mappedTypeNode.readonlyToken, file, sourceFile);
                        handleSingleNode(mappedTypeNode.type, file, sourceFile);
                        handleSingleNode(mappedTypeNode.typeParameter, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.LiteralType:
                        var literalTypeNode = node;
                        handleSingleNode(literalTypeNode.literal, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ImportType:
                        var importTypeNode = node;
                        handleSingleNode(importTypeNode.qualifier, file, sourceFile);
                        handleSingleNode(importTypeNode.argument, file, sourceFile);
                        handleMultipleNodes(importTypeNode.typeArguments, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ObjectBindingPattern:
                        var objectBindingPattern = node;
                        handleMultipleNodes(objectBindingPattern.elements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ArrayBindingPattern:
                        var arrayBindingPattern = node;
                        handleMultipleNodes(arrayBindingPattern.elements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.BindingElement:
                        var bindingElement = node;
                        handleSingleNode(bindingElement.name, file, sourceFile);
                        handleSingleNode(bindingElement.initializer, file, sourceFile);
                        handleSingleNode(bindingElement.dotDotDotToken, file, sourceFile);
                        handleSingleNode(bindingElement.propertyName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ArrayLiteralExpression:
                        var arrayLiteralExpression = node;
                        handleMultipleNodes(arrayLiteralExpression.elements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ObjectLiteralExpression:
                        var objectLiteralExpression = node;
                        handleMultipleNodes(objectLiteralExpression.properties, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.PropertyAccessExpression:
                        var propertyAccessExpression = node;
                        handleSingleNode(propertyAccessExpression.expression, file, sourceFile);
                        handleSingleNode(propertyAccessExpression.name, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ElementAccessExpression:
                        var elementAccessExpression = node;
                        handleSingleNode(elementAccessExpression.expression, file, sourceFile);
                        handleSingleNode(elementAccessExpression.argumentExpression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.CallExpression:
                        var callExpression = node;
                        handleSingleNode(callExpression.expression, file, sourceFile);
                        handleMultipleNodes(callExpression.arguments, file, sourceFile);
                        handleMultipleNodes(callExpression.typeArguments, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.NewExpression:
                        var newExpression = node;
                        handleSingleNode(newExpression.expression, file, sourceFile);
                        handleMultipleNodes(newExpression.arguments, file, sourceFile);
                        handleMultipleNodes(newExpression.typeArguments, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TaggedTemplateExpression:
                        var taggedTemplateExpression = node;
                        handleSingleNode(taggedTemplateExpression.template, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeAssertionExpression:
                        var typeAssertion = node;
                        handleSingleNode(typeAssertion.expression, file, sourceFile);
                        handleSingleNode(typeAssertion.type, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ParenthesizedExpression:
                        var parenthesizedExpression = node;
                        handleSingleNode(parenthesizedExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.FunctionExpression:
                        var functionExpression = node;
                        handleSingleNode(functionExpression.name, file, sourceFile);
                        handleMultipleNodes(functionExpression.parameters, file, sourceFile);
                        handleSingleNode(functionExpression.body, file, sourceFile);
                        handleSingleNode(functionExpression.asteriskToken, file, sourceFile);
                        handleSingleNode(functionExpression.questionToken, file, sourceFile);
                        handleSingleNode(functionExpression.type, file, sourceFile);
                        handleMultipleNodes(functionExpression.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ArrowFunction:
                        var arrowFunction = node;
                        handleSingleNode(arrowFunction.name, file, sourceFile);
                        handleMultipleNodes(arrowFunction.parameters, file, sourceFile);
                        handleSingleNode(arrowFunction.body, file, sourceFile);
                        handleSingleNode(arrowFunction.asteriskToken, file, sourceFile);
                        handleSingleNode(arrowFunction.questionToken, file, sourceFile);
                        handleSingleNode(arrowFunction.type, file, sourceFile);
                        handleMultipleNodes(arrowFunction.typeParameters, file, sourceFile);
                        handleSingleNode(arrowFunction.equalsGreaterThanToken, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.DeleteExpression:
                        var deleteExpression = node;
                        handleSingleNode(deleteExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeOfExpression:
                        var typeOfExpression = node;
                        handleSingleNode(typeOfExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.VoidExpression:
                        var voidExpression = node;
                        handleSingleNode(voidExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.AwaitExpression:
                        var awaitExpression = node;
                        handleSingleNode(awaitExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.PrefixUnaryExpression:
                        var prefixUnaryExpression = node;
                        handleSingleNode(prefixUnaryExpression.operand, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.PostfixUnaryExpression:
                        var postfixUnaryExpression = node;
                        handleSingleNode(postfixUnaryExpression.operand, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.BinaryExpression:
                        var binaryExpression = node;
                        handleSingleNode(binaryExpression.left, file, sourceFile);
                        handleSingleNode(binaryExpression.right, file, sourceFile);
                        handleSingleNode(binaryExpression.operatorToken, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ConditionalExpression:
                        var conditionalExpression = node;
                        handleSingleNode(conditionalExpression.condition, file, sourceFile);
                        handleSingleNode(conditionalExpression.colonToken, file, sourceFile);
                        handleSingleNode(conditionalExpression.questionToken, file, sourceFile);
                        handleSingleNode(conditionalExpression.whenTrue, file, sourceFile);
                        handleSingleNode(conditionalExpression.whenFalse, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TemplateExpression:
                        var templateExpression = node;
                        handleMultipleNodes(templateExpression.templateSpans, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.YieldExpression:
                        var yieldExpression = node;
                        handleSingleNode(yieldExpression.asteriskToken, file, sourceFile);
                        handleSingleNode(yieldExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.SpreadElement:
                        var spreadElement = node;
                        handleSingleNode(spreadElement.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ClassExpression:
                        var classExpression = node;
                        handleSingleNode(classExpression.name, file, sourceFile);
                        handleMultipleNodes(classExpression.typeParameters, file, sourceFile);
                        handleMultipleNodes(classExpression.members, file, sourceFile);
                        handleMultipleNodes(classExpression.heritageClauses, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.OmittedExpression:
                        break;
                    case typescript_1.default.SyntaxKind.ExpressionWithTypeArguments:
                        var expressionWithTypeArguments = node;
                        handleSingleNode(expressionWithTypeArguments.expression, file, sourceFile);
                        handleMultipleNodes(expressionWithTypeArguments.typeArguments, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.AsExpression:
                        var asExpression = node;
                        handleSingleNode(asExpression.expression, file, sourceFile);
                        handleSingleNode(asExpression.type, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.NonNullExpression:
                        var nonNullExpression = node;
                        handleSingleNode(nonNullExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.MetaProperty:
                        var metaProperty = node;
                        handleSingleNode(metaProperty.name, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TemplateSpan:
                        var templateSpan = node;
                        handleSingleNode(templateSpan.expression, file, sourceFile);
                        handleSingleNode(templateSpan.literal, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.SemicolonClassElement:
                        var semicolonClassElement = node;
                        handleSingleNode(semicolonClassElement.name, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.Block:
                        var block = node;
                        handleMultipleNodes(block.statements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.VariableStatement:
                        var variableStatement = node;
                        handleSingleNode(variableStatement.declarationList, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.EmptyStatement:
                        break;
                    case typescript_1.default.SyntaxKind.ExpressionStatement:
                        var expressionStatement = node;
                        handleSingleNode(expressionStatement.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.IfStatement:
                        var ifStatement = node;
                        handleSingleNode(ifStatement.expression, file, sourceFile);
                        handleSingleNode(ifStatement.thenStatement, file, sourceFile);
                        handleSingleNode(ifStatement.elseStatement, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.DoStatement:
                        var doStatement = node;
                        handleSingleNode(doStatement.expression, file, sourceFile);
                        handleSingleNode(doStatement.statement, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.WhileStatement:
                        var whileStatement = node;
                        handleSingleNode(whileStatement.statement, file, sourceFile);
                        handleSingleNode(whileStatement.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ForStatement:
                        var forStatement = node;
                        handleSingleNode(forStatement.initializer, file, sourceFile);
                        handleSingleNode(forStatement.condition, file, sourceFile);
                        handleSingleNode(forStatement.incrementor, file, sourceFile);
                        handleSingleNode(forStatement.statement, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ForInStatement:
                        var forInStatement = node;
                        handleSingleNode(forInStatement.initializer, file, sourceFile);
                        handleSingleNode(forInStatement.expression, file, sourceFile);
                        handleSingleNode(forInStatement.statement, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ForOfStatement:
                        var forOfStatement = node;
                        handleSingleNode(forOfStatement.initializer, file, sourceFile);
                        handleSingleNode(forOfStatement.statement, file, sourceFile);
                        handleSingleNode(forOfStatement.expression, file, sourceFile);
                        handleSingleNode(forOfStatement.awaitModifier, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ContinueStatement:
                    case typescript_1.default.SyntaxKind.BreakStatement:
                        break;
                    case typescript_1.default.SyntaxKind.ReturnStatement:
                        var returnStatement = node;
                        handleSingleNode(returnStatement.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.WithStatement:
                        var withStatement = node;
                        handleSingleNode(withStatement.expression, file, sourceFile);
                        handleSingleNode(withStatement.statement, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.SwitchStatement:
                        var switchStatement = node;
                        handleSingleNode(switchStatement.expression, file, sourceFile);
                        handleSingleNode(switchStatement.caseBlock, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.LabeledStatement:
                        var labeledStatement = node;
                        handleSingleNode(labeledStatement.label, file, sourceFile);
                        handleSingleNode(labeledStatement.statement, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ThrowStatement:
                        var throwStatement = node;
                        handleSingleNode(throwStatement.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TryStatement:
                        var tryStatement = node;
                        handleSingleNode(tryStatement.tryBlock, file, sourceFile);
                        handleSingleNode(tryStatement.catchClause, file, sourceFile);
                        handleSingleNode(tryStatement.finallyBlock, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.DebuggerStatement:
                        break;
                    case typescript_1.default.SyntaxKind.VariableDeclaration:
                        var variableDeclaration = node;
                        handleSingleNode(variableDeclaration.name, file, sourceFile);
                        handleSingleNode(variableDeclaration.type, file, sourceFile);
                        handleSingleNode(variableDeclaration.initializer, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.VariableDeclarationList:
                        var declarationList = node;
                        handleMultipleNodes(declarationList.declarations, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.FunctionDeclaration:
                        var functionDeclaration = node;
                        handleSingleNode(functionDeclaration.name, file, sourceFile);
                        handleMultipleNodes(functionDeclaration.parameters, file, sourceFile);
                        handleSingleNode(functionDeclaration.body, file, sourceFile);
                        handleSingleNode(functionDeclaration.asteriskToken, file, sourceFile);
                        handleSingleNode(functionDeclaration.questionToken, file, sourceFile);
                        handleSingleNode(functionDeclaration.type, file, sourceFile);
                        handleMultipleNodes(functionDeclaration.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ClassDeclaration:
                        var classDeclaration = node;
                        handleSingleNode(classDeclaration.name, file, sourceFile);
                        handleMultipleNodes(classDeclaration.members, file, sourceFile);
                        handleMultipleNodes(classDeclaration.typeParameters, file, sourceFile);
                        handleMultipleNodes(classDeclaration.heritageClauses, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.InterfaceDeclaration:
                        var interfaceDeclaration = node;
                        handleSingleNode(interfaceDeclaration.name, file, sourceFile);
                        handleMultipleNodes(interfaceDeclaration.members, file, sourceFile);
                        handleMultipleNodes(interfaceDeclaration.typeParameters, file, sourceFile);
                        handleMultipleNodes(interfaceDeclaration.heritageClauses, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.TypeAliasDeclaration:
                        var typeAliasDeclaration = node;
                        handleSingleNode(typeAliasDeclaration.name, file, sourceFile);
                        handleSingleNode(typeAliasDeclaration.type, file, sourceFile);
                        handleMultipleNodes(typeAliasDeclaration.typeParameters, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.EnumDeclaration:
                        var enumDeclaration = node;
                        handleSingleNode(enumDeclaration.name, file, sourceFile);
                        handleMultipleNodes(enumDeclaration.members, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ModuleDeclaration:
                        var moduleDeclaration = node;
                        handleSingleNode(moduleDeclaration.name, file, sourceFile);
                        handleSingleNode(moduleDeclaration.body, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ModuleBlock:
                        var moduleBlock = node;
                        handleMultipleNodes(moduleBlock.statements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.CaseBlock:
                        var caseBlock = node;
                        handleMultipleNodes(caseBlock.clauses, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.NamespaceExportDeclaration:
                        var namespaceExportDeclaration = node;
                        handleSingleNode(namespaceExportDeclaration.name, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ImportEqualsDeclaration:
                        var importEqualsDeclaration = node;
                        handleSingleNode(importEqualsDeclaration.name, file, sourceFile);
                        handleSingleNode(importEqualsDeclaration.moduleReference, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ImportDeclaration:
                        var importDeclaration = node;
                        handleSingleNode(importDeclaration.importClause, file, sourceFile);
                        handleSingleNode(importDeclaration.moduleSpecifier, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ImportClause:
                        var importClause = node;
                        handleSingleNode(importClause.name, file, sourceFile);
                        handleSingleNode(importClause.namedBindings, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.NamespaceImport:
                        var namespaceImport = node;
                        handleSingleNode(namespaceImport.name, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.NamedImports:
                        var namedImports = node;
                        handleMultipleNodes(namedImports.elements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ImportSpecifier:
                        var importSpecifier = node;
                        handleSingleNode(importSpecifier.name, file, sourceFile);
                        handleSingleNode(importSpecifier.propertyName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ExportAssignment:
                        var exportAssignment = node;
                        handleSingleNode(exportAssignment.name, file, sourceFile);
                        handleSingleNode(exportAssignment.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ExportDeclaration:
                        var exportDeclaration = node;
                        handleSingleNode(exportDeclaration.exportClause, file, sourceFile);
                        handleSingleNode(exportDeclaration.name, file, sourceFile);
                        handleSingleNode(exportDeclaration.moduleSpecifier, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.NamedExports:
                        var namedExports = node;
                        handleMultipleNodes(namedExports.elements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ExportSpecifier:
                        var exportSpecifier = node;
                        handleSingleNode(exportSpecifier.name, file, sourceFile);
                        handleSingleNode(exportSpecifier.propertyName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.MissingDeclaration:
                        var missingDeclaration = node;
                        handleSingleNode(missingDeclaration.name, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ExternalModuleReference:
                        var externalModuleReference = node;
                        handleSingleNode(externalModuleReference.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxElement:
                        var jsxElement = node;
                        handleSingleNode(jsxElement.openingElement, file, sourceFile);
                        handleSingleNode(jsxElement.closingElement, file, sourceFile);
                        handleMultipleNodes(jsxElement.children, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxSelfClosingElement:
                        var jsxSelfClosingElement = node;
                        handleSingleNode(jsxSelfClosingElement.attributes, file, sourceFile);
                        handleSingleNode(jsxSelfClosingElement.tagName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxOpeningElement:
                        var jsxOpeningElement = node;
                        handleSingleNode(jsxOpeningElement.attributes, file, sourceFile);
                        handleSingleNode(jsxOpeningElement.tagName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxClosingElement:
                        var jsxClosingElement = node;
                        handleSingleNode(jsxClosingElement.tagName, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxFragment:
                        var jsxFragment = node;
                        handleSingleNode(jsxFragment.openingFragment, file, sourceFile);
                        handleSingleNode(jsxFragment.closingFragment, file, sourceFile);
                        handleMultipleNodes(jsxFragment.children, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxOpeningFragment:
                        break;
                    case typescript_1.default.SyntaxKind.JsxClosingFragment:
                        break;
                    case typescript_1.default.SyntaxKind.JsxAttribute:
                        var jsxAttribute = node;
                        handleSingleNode(jsxAttribute.name, file, sourceFile);
                        handleSingleNode(jsxAttribute.initializer, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxAttributes:
                        var jsxAttributes = node;
                        handleMultipleNodes(jsxAttributes.properties, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxSpreadAttribute:
                        var jsxSpreadAttribute = node;
                        handleSingleNode(jsxSpreadAttribute.name, file, sourceFile);
                        handleSingleNode(jsxSpreadAttribute.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.JsxExpression:
                        var jsxExpression = node;
                        handleSingleNode(jsxExpression.dotDotDotToken, file, sourceFile);
                        handleSingleNode(jsxExpression.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.CaseClause:
                        var caseClause = node;
                        handleMultipleNodes(caseClause.statements, file, sourceFile);
                        handleSingleNode(caseClause.expression, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.DefaultClause:
                        var defaultClause = node;
                        handleMultipleNodes(defaultClause.statements, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.HeritageClause:
                        var heritageClause = node;
                        handleMultipleNodes(heritageClause.types, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.CatchClause:
                        var catchClause = node;
                        handleSingleNode(catchClause.variableDeclaration, file, sourceFile);
                        handleSingleNode(catchClause.block, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.PropertyAssignment:
                        var propertyAssignmentExpression = node;
                        handleSingleNode(propertyAssignmentExpression.name, file, sourceFile);
                        handleSingleNode(propertyAssignmentExpression.questionToken, file, sourceFile);
                        handleSingleNode(propertyAssignmentExpression.initializer, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.ShorthandPropertyAssignment:
                        var shorthandPropertyAssignment = node;
                        handleSingleNode(shorthandPropertyAssignment.name, file, sourceFile);
                        handleSingleNode(shorthandPropertyAssignment.questionToken, file, sourceFile);
                        handleSingleNode(shorthandPropertyAssignment.equalsToken, file, sourceFile);
                        handleSingleNode(shorthandPropertyAssignment.objectAssignmentInitializer, file, sourceFile);
                        break;
                    case typescript_1.default.SyntaxKind.SpreadAssignment:
                        var spreadAssignment = node;
                        handleSingleNode(spreadAssignment.name, file, sourceFile);
                        handleSingleNode(spreadAssignment.expression, file, sourceFile);
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
                        _b = this.tsConfig.getTsConfigFilePath(project), configFilePath = _b.configFilePath, dirname = _b.dirname;
                        config = this.tsConfig.getTsConfig(configFilePath, dirname);
                        _c = typescript_1.default.convertCompilerOptionsFromJson(config.compilerOptions, dirname), compilerOptions = _c.options, errors = _c.errors;
                        if (errors && errors.length > 0) {
                            throw errors;
                        }
                        return [4 /*yield*/, this.tsConfig.getRootNames(config, dirname)];
                    case 1:
                        rootNames = _f.sent();
                        program = typescript_1.default.createProgram(rootNames, compilerOptions, undefined, oldProgram);
                        checker = program.getTypeChecker();
                        correctCount = 0;
                        totalCount = 0;
                        anys = [];
                        _loop_1 = function (sourceFile) {
                            var file = sourceFile.fileName;
                            if (!file.includes('node_modules')) {
                                file = path.relative(process.cwd(), file);
                                // checks if looking for a single file or a whole folder (if the arguement -f was given)
                                if (files) {
                                    sourceFile.forEachChild(function (node) {
                                        if (file.includes(files)) {
                                            return handleSingleNode(node, file, sourceFile);
                                        }
                                    });
                                }
                                else {
                                    sourceFile.forEachChild(function (node) {
                                        return handleSingleNode(node, file, sourceFile);
                                    });
                                }
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
    };
    CheckTypes = tslib_1.__decorate([
        inversify_1.injectable(),
        tslib_1.__param(0, inversify_1.inject('TsConfig')),
        tslib_1.__metadata("design:paramtypes", [ts_config_1.TsConfig])
    ], CheckTypes);
    return CheckTypes;
}());
exports.CheckTypes = CheckTypes;
