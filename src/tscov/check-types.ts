import 'reflect-metadata'
import ts from 'typescript'
import * as path from 'path'

import { injectable, inject } from 'inversify'
import { TsConfig } from './ts-config'
import { JsonConfig } from './types/json-config.type'

@injectable()
export class CheckTypes {

  constructor(@inject('TsConfig') private tsConfig: TsConfig) {}

  // tslint:disable-next-line:no-big-function
  public async startLinter(project: string, detail: boolean, debug: boolean, files?: any, oldProgram?: ts.Program): Promise<any> {
    const { configFilePath, dirname } = this.tsConfig.getTsConfigFilePath(project)
    const config: JsonConfig = this.tsConfig.getTsConfig(configFilePath, dirname)

    const { options: compilerOptions, errors } = ts.convertCompilerOptionsFromJson(config.compilerOptions, dirname)
    if (errors && errors.length > 0) {
      throw errors
    }

    const rootNames: string[] = await this.tsConfig.getRootNames(config, dirname)

    const program: ts.Program = ts.createProgram(rootNames, compilerOptions, undefined, oldProgram)
    const checker: ts.TypeChecker = program.getTypeChecker()

    let correctCount: number = 0
    let totalCount: number = 0
    let anys: { file: string, line: number, character: number, text: string }[] = []

    function collectData(node: ts.Node, file: string, sourceFile: ts.SourceFile): void {
      const type: ts.Type = checker.getTypeAtLocation(node)
      if (type) {
        const { line, character } = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile))
        totalCount++
        if (type.flags === 1 && (type as any).intrinsicName === 'any') {
          if (debug) {
            console.log(`type === any: ${file}:${line + 1}:${character + 1}: ${node.getText(sourceFile)}`)
          } else if (detail) {
            anys.push({ file, line, character, text: node.getText(sourceFile) })
          }
        } else {
          correctCount++
          if (debug) {
            console.log(`type !== any: ${file}:${line + 1}:${character + 1}: ${node.getText(sourceFile)} ${node.kind}(kind) ${type.flags}(flag) ${(type as any).intrinsicName || ''}`)
          }
        }
      }
    }

    function handleMultipleNodes(nodes: ts.NodeArray<ts.Node> | undefined, file: string, sourceFile: ts.SourceFile): void {
      if (nodes === undefined) {
        return
      }

      for (const node of nodes) {
        handleSingleNode(node, file, sourceFile)
      }
    }

    // tslint:disable-next-line:no-big-function
    function handleSingleNode(node: ts.Node | undefined, file: string, sourceFile: ts.SourceFile): void {
      if (node === undefined) {
        return
      }

      if (debug) {
        const { line, character } = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile))
        console.log(`node: ${file}:${line + 1}:${character + 1}: ${node.getText(sourceFile)} ${node.kind}(kind)`)
      }
      handleMultipleNodes(node.decorators, file, sourceFile)
      handleMultipleNodes(node.modifiers, file, sourceFile)

      switch (node.kind) {
        case ts.SyntaxKind.Unknown:
        case ts.SyntaxKind.EndOfFileToken:
        case ts.SyntaxKind.SingleLineCommentTrivia:
        case ts.SyntaxKind.MultiLineCommentTrivia:
        case ts.SyntaxKind.NewLineTrivia:
        case ts.SyntaxKind.WhitespaceTrivia:
        case ts.SyntaxKind.ShebangTrivia:
        case ts.SyntaxKind.ConflictMarkerTrivia:
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.JsxText:
        case ts.SyntaxKind.JsxTextAllWhiteSpaces:
        case ts.SyntaxKind.RegularExpressionLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateHead:
        case ts.SyntaxKind.TemplateMiddle:
        case ts.SyntaxKind.TemplateTail:
        case ts.SyntaxKind.OpenBraceToken:
        case ts.SyntaxKind.CloseBraceToken:
        case ts.SyntaxKind.OpenParenToken:
        case ts.SyntaxKind.CloseParenToken:
        case ts.SyntaxKind.OpenBracketToken:
        case ts.SyntaxKind.CloseBracketToken:
        case ts.SyntaxKind.DotToken:
        case ts.SyntaxKind.DotDotDotToken:
        case ts.SyntaxKind.SemicolonToken:
        case ts.SyntaxKind.CommaToken:
        case ts.SyntaxKind.LessThanToken:
        case ts.SyntaxKind.LessThanSlashToken:
        case ts.SyntaxKind.GreaterThanToken:
        case ts.SyntaxKind.LessThanEqualsToken:
        case ts.SyntaxKind.GreaterThanEqualsToken:
        case ts.SyntaxKind.EqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsToken:
        case ts.SyntaxKind.EqualsEqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        case ts.SyntaxKind.EqualsGreaterThanToken:
        case ts.SyntaxKind.PlusToken:
        case ts.SyntaxKind.MinusToken:
        case ts.SyntaxKind.AsteriskToken:
        case ts.SyntaxKind.AsteriskAsteriskToken:
        case ts.SyntaxKind.SlashToken:
        case ts.SyntaxKind.PercentToken:
        case ts.SyntaxKind.PlusPlusToken:
        case ts.SyntaxKind.MinusMinusToken:
        case ts.SyntaxKind.LessThanLessThanToken:
        case ts.SyntaxKind.GreaterThanGreaterThanToken:
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        case ts.SyntaxKind.AmpersandToken:
        case ts.SyntaxKind.BarToken:
        case ts.SyntaxKind.CaretToken:
        case ts.SyntaxKind.ExclamationToken:
        case ts.SyntaxKind.TildeToken:
        case ts.SyntaxKind.AmpersandAmpersandToken:
        case ts.SyntaxKind.BarBarToken:
        case ts.SyntaxKind.QuestionToken:
        case ts.SyntaxKind.ColonToken:
        case ts.SyntaxKind.AtToken:
        case ts.SyntaxKind.EqualsToken:
        case ts.SyntaxKind.PlusEqualsToken:
        case ts.SyntaxKind.MinusEqualsToken:
        case ts.SyntaxKind.AsteriskEqualsToken:
        case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
        case ts.SyntaxKind.SlashEqualsToken:
        case ts.SyntaxKind.PercentEqualsToken:
        case ts.SyntaxKind.LessThanLessThanEqualsToken:
        case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
        case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
        case ts.SyntaxKind.AmpersandEqualsToken:
        case ts.SyntaxKind.BarEqualsToken:
        case ts.SyntaxKind.CaretEqualsToken:
          break
        case ts.SyntaxKind.Identifier:
          collectData(node, file, sourceFile)
          break
        case ts.SyntaxKind.BreakKeyword:
        case ts.SyntaxKind.CaseKeyword:
        case ts.SyntaxKind.CatchKeyword:
        case ts.SyntaxKind.ClassKeyword:
        case ts.SyntaxKind.ConstKeyword:
        case ts.SyntaxKind.ContinueKeyword:
        case ts.SyntaxKind.DebuggerKeyword:
        case ts.SyntaxKind.DefaultKeyword:
        case ts.SyntaxKind.DeleteKeyword:
        case ts.SyntaxKind.DoKeyword:
        case ts.SyntaxKind.ElseKeyword:
        case ts.SyntaxKind.EnumKeyword:
        case ts.SyntaxKind.ExportKeyword:
        case ts.SyntaxKind.ExtendsKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.FinallyKeyword:
        case ts.SyntaxKind.ForKeyword:
        case ts.SyntaxKind.FunctionKeyword:
        case ts.SyntaxKind.IfKeyword:
        case ts.SyntaxKind.ImportKeyword:
        case ts.SyntaxKind.InKeyword:
        case ts.SyntaxKind.InstanceOfKeyword:
        case ts.SyntaxKind.NewKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.ReturnKeyword:
        case ts.SyntaxKind.SuperKeyword:
        case ts.SyntaxKind.SwitchKeyword:
          break
        case ts.SyntaxKind.ThisKeyword:
          collectData(node, file, sourceFile)
          break
        case ts.SyntaxKind.ThrowKeyword:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.TryKeyword:
        case ts.SyntaxKind.TypeOfKeyword:
        case ts.SyntaxKind.VarKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.WhileKeyword:
        case ts.SyntaxKind.WithKeyword:
        case ts.SyntaxKind.ImplementsKeyword:
        case ts.SyntaxKind.InterfaceKeyword:
        case ts.SyntaxKind.LetKeyword:
        case ts.SyntaxKind.PackageKeyword:
        case ts.SyntaxKind.PrivateKeyword:
        case ts.SyntaxKind.ProtectedKeyword:
        case ts.SyntaxKind.PublicKeyword:
        case ts.SyntaxKind.StaticKeyword:
        case ts.SyntaxKind.YieldKeyword:
        case ts.SyntaxKind.AbstractKeyword:
        case ts.SyntaxKind.AsKeyword:
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.AsyncKeyword:
        case ts.SyntaxKind.AwaitKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.ConstructorKeyword:
        case ts.SyntaxKind.DeclareKeyword:
        case ts.SyntaxKind.GetKeyword:
        case ts.SyntaxKind.IsKeyword:
        case ts.SyntaxKind.KeyOfKeyword:
        case ts.SyntaxKind.ModuleKeyword:
        case ts.SyntaxKind.NamespaceKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.ReadonlyKeyword:
        case ts.SyntaxKind.RequireKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.SetKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.TypeKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.UniqueKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.FromKeyword:
        case ts.SyntaxKind.GlobalKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.OfKeyword:
          break
        case ts.SyntaxKind.QualifiedName:
          const qualifiedName = node as ts.QualifiedName
          handleSingleNode(qualifiedName.left, file, sourceFile)
          handleSingleNode(qualifiedName.right, file, sourceFile)
          break
        case ts.SyntaxKind.ComputedPropertyName:
          const computedPropertyName = node as ts.ComputedPropertyName
          handleSingleNode(computedPropertyName.expression, file, sourceFile)
          break
        case ts.SyntaxKind.TypeParameter:
          const typeParameterDeclaration = node as ts.TypeParameterDeclaration
          handleSingleNode(typeParameterDeclaration.name, file, sourceFile)
          handleSingleNode(typeParameterDeclaration.default, file, sourceFile)
          handleSingleNode(typeParameterDeclaration.expression, file, sourceFile)
          handleSingleNode(typeParameterDeclaration.constraint, file, sourceFile)
          break
        case ts.SyntaxKind.Parameter:
          const parameterDeclaration = node as ts.ParameterDeclaration
          handleSingleNode(parameterDeclaration.dotDotDotToken, file, sourceFile)
          handleSingleNode(parameterDeclaration.name, file, sourceFile)
          handleSingleNode(parameterDeclaration.initializer, file, sourceFile)
          handleSingleNode(parameterDeclaration.type, file, sourceFile)
          handleSingleNode(parameterDeclaration.questionToken, file, sourceFile)
          break
        case ts.SyntaxKind.Decorator:
          const decorator = node as ts.Decorator
          handleSingleNode(decorator.expression, file, sourceFile)
          break
        case ts.SyntaxKind.PropertySignature:
          const propertySignature = node as ts.PropertySignature
          handleSingleNode(propertySignature.name, file, sourceFile)
          handleSingleNode(propertySignature.questionToken, file, sourceFile)
          handleSingleNode(propertySignature.type, file, sourceFile)
          handleSingleNode(propertySignature.initializer, file, sourceFile)
          break
        case ts.SyntaxKind.PropertyDeclaration:
          const propertyDeclaration = node as ts.PropertyDeclaration
          handleSingleNode(propertyDeclaration.name, file, sourceFile)
          handleSingleNode(propertyDeclaration.initializer, file, sourceFile)
          handleSingleNode(propertyDeclaration.type, file, sourceFile)
          handleSingleNode(propertyDeclaration.questionToken, file, sourceFile)
          break
        case ts.SyntaxKind.MethodSignature:
          const methodSignature = node as ts.MethodSignature
          handleSingleNode(methodSignature.name, file, sourceFile)
          handleMultipleNodes(methodSignature.parameters, file, sourceFile)
          handleSingleNode(methodSignature.questionToken, file, sourceFile)
          handleSingleNode(methodSignature.type, file, sourceFile)
          handleMultipleNodes(methodSignature.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
          const functionLikeDeclarationBase = node as ts.FunctionLikeDeclarationBase
          handleSingleNode(functionLikeDeclarationBase.name, file, sourceFile)
          handleMultipleNodes(functionLikeDeclarationBase.parameters, file, sourceFile)
          handleSingleNode(functionLikeDeclarationBase.body, file, sourceFile)
          handleSingleNode(functionLikeDeclarationBase.asteriskToken, file, sourceFile)
          handleSingleNode(functionLikeDeclarationBase.questionToken, file, sourceFile)
          handleSingleNode(functionLikeDeclarationBase.type, file, sourceFile)
          handleMultipleNodes(functionLikeDeclarationBase.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.CallSignature:
          const callSignatureDeclaration = node as ts.CallSignatureDeclaration
          handleSingleNode(callSignatureDeclaration.name, file, sourceFile)
          handleMultipleNodes(callSignatureDeclaration.parameters, file, sourceFile)
          handleSingleNode(callSignatureDeclaration.questionToken, file, sourceFile)
          handleSingleNode(callSignatureDeclaration.type, file, sourceFile)
          handleMultipleNodes(callSignatureDeclaration.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.ConstructSignature:
          const constructSignatureDeclaration = node as ts.ConstructSignatureDeclaration
          handleSingleNode(constructSignatureDeclaration.name, file, sourceFile)
          handleMultipleNodes(constructSignatureDeclaration.parameters, file, sourceFile)
          handleSingleNode(constructSignatureDeclaration.questionToken, file, sourceFile)
          handleSingleNode(constructSignatureDeclaration.type, file, sourceFile)
          handleMultipleNodes(constructSignatureDeclaration.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.IndexSignature:
          const indexSignatureDeclaration = node as ts.IndexSignatureDeclaration
          handleSingleNode(indexSignatureDeclaration.name, file, sourceFile)
          handleMultipleNodes(indexSignatureDeclaration.parameters, file, sourceFile)
          handleSingleNode(indexSignatureDeclaration.questionToken, file, sourceFile)
          handleSingleNode(indexSignatureDeclaration.type, file, sourceFile)
          handleMultipleNodes(indexSignatureDeclaration.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.TypePredicate:
          const typePredicateNode = node as ts.TypePredicateNode
          handleSingleNode(typePredicateNode.type, file, sourceFile)
          handleSingleNode(typePredicateNode.parameterName, file, sourceFile)
          break
        case ts.SyntaxKind.TypeReference:
          const typeReferenceNode = node as ts.TypeReferenceNode
          handleSingleNode(typeReferenceNode.typeName, file, sourceFile)
          handleMultipleNodes(typeReferenceNode.typeArguments, file, sourceFile)
          break
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
          const signatureDeclarationBase = node as ts.SignatureDeclarationBase
          handleSingleNode(signatureDeclarationBase.name, file, sourceFile)
          handleMultipleNodes(signatureDeclarationBase.parameters, file, sourceFile)
          handleSingleNode(signatureDeclarationBase.type, file, sourceFile)
          handleMultipleNodes(signatureDeclarationBase.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.TypeQuery:
          const typeQueryNode = node as ts.TypeQueryNode
          handleSingleNode(typeQueryNode.exprName, file, sourceFile)
          break
        case ts.SyntaxKind.TypeLiteral:
          const typeLiteralNode = node as ts.TypeLiteralNode
          handleMultipleNodes(typeLiteralNode.members, file, sourceFile)
          break
        case ts.SyntaxKind.ArrayType:
          const arrayTypeNode = node as ts.ArrayTypeNode
          handleSingleNode(arrayTypeNode.elementType, file, sourceFile)
          break
        case ts.SyntaxKind.TupleType:
          const tupleTypeNode = node as ts.TupleTypeNode
          handleMultipleNodes(tupleTypeNode.elementTypes, file, sourceFile)
          break
        case ts.SyntaxKind.OptionalType:
          break
        case ts.SyntaxKind.RestType:
          const restTypeNode = node as ts.RestTypeNode
          handleSingleNode(restTypeNode.type, file, sourceFile)
          break
        case ts.SyntaxKind.UnionType:
          const unionTypeNode = node as ts.UnionTypeNode
          handleMultipleNodes(unionTypeNode.types, file, sourceFile)
          break
        case ts.SyntaxKind.IntersectionType:
          const intersectionTypeNode = node as ts.IntersectionTypeNode
          handleMultipleNodes(intersectionTypeNode.types, file, sourceFile)
          break
        case ts.SyntaxKind.ConditionalType:
          const conditionalTypeNode = node as ts.ConditionalTypeNode
          handleSingleNode(conditionalTypeNode.checkType, file, sourceFile)
          handleSingleNode(conditionalTypeNode.extendsType, file, sourceFile)
          handleSingleNode(conditionalTypeNode.trueType, file, sourceFile)
          handleSingleNode(conditionalTypeNode.falseType, file, sourceFile)
          break
        case ts.SyntaxKind.InferType:
          const inferTypeNode = node as ts.InferTypeNode
          handleSingleNode(inferTypeNode.typeParameter, file, sourceFile)
          break
        case ts.SyntaxKind.ParenthesizedType:
          const parenthesizedTypeNode = node as ts.ParenthesizedTypeNode
          handleSingleNode(parenthesizedTypeNode.type, file, sourceFile)
          break
        case ts.SyntaxKind.ThisType:
          break
        case ts.SyntaxKind.TypeOperator:
          const typeOperatorNode = node as ts.TypeOperatorNode
          handleSingleNode(typeOperatorNode.type, file, sourceFile)
          break
        case ts.SyntaxKind.IndexedAccessType:
          const indexedAccessTypeNode = node as ts.IndexedAccessTypeNode
          handleSingleNode(indexedAccessTypeNode.objectType, file, sourceFile)
          handleSingleNode(indexedAccessTypeNode.indexType, file, sourceFile)
          break
        case ts.SyntaxKind.MappedType:
          const mappedTypeNode = node as ts.MappedTypeNode
          handleSingleNode(mappedTypeNode.questionToken, file, sourceFile)
          handleSingleNode(mappedTypeNode.readonlyToken, file, sourceFile)
          handleSingleNode(mappedTypeNode.type, file, sourceFile)
          handleSingleNode(mappedTypeNode.typeParameter, file, sourceFile)
          break
        case ts.SyntaxKind.LiteralType:
          const literalTypeNode = node as ts.LiteralTypeNode
          handleSingleNode(literalTypeNode.literal, file, sourceFile)
          break
        case ts.SyntaxKind.ImportType:
          const importTypeNode = node as ts.ImportTypeNode
          handleSingleNode(importTypeNode.qualifier, file, sourceFile)
          handleSingleNode(importTypeNode.argument, file, sourceFile)
          handleMultipleNodes(importTypeNode.typeArguments, file, sourceFile)
          break
        case ts.SyntaxKind.ObjectBindingPattern:
          const objectBindingPattern = node as ts.ObjectBindingPattern
          handleMultipleNodes(objectBindingPattern.elements, file, sourceFile)
          break
        case ts.SyntaxKind.ArrayBindingPattern:
          const arrayBindingPattern = node as ts.ArrayBindingPattern
          handleMultipleNodes(arrayBindingPattern.elements, file, sourceFile)
          break
        case ts.SyntaxKind.BindingElement:
          const bindingElement = node as ts.BindingElement
          handleSingleNode(bindingElement.name, file, sourceFile)
          handleSingleNode(bindingElement.initializer, file, sourceFile)
          handleSingleNode(bindingElement.dotDotDotToken, file, sourceFile)
          handleSingleNode(bindingElement.propertyName, file, sourceFile)
          break
        case ts.SyntaxKind.ArrayLiteralExpression:
          const arrayLiteralExpression = node as ts.ArrayLiteralExpression
          handleMultipleNodes(arrayLiteralExpression.elements, file, sourceFile)
          break
        case ts.SyntaxKind.ObjectLiteralExpression:
          const objectLiteralExpression = node as ts.ObjectLiteralExpression
          handleMultipleNodes(objectLiteralExpression.properties, file, sourceFile)
          break
        case ts.SyntaxKind.PropertyAccessExpression:
          const propertyAccessExpression = node as ts.PropertyAccessExpression
          handleSingleNode(propertyAccessExpression.expression, file, sourceFile)
          handleSingleNode(propertyAccessExpression.name, file, sourceFile)
          break
        case ts.SyntaxKind.ElementAccessExpression:
          const elementAccessExpression = node as ts.ElementAccessExpression
          handleSingleNode(elementAccessExpression.expression, file, sourceFile)
          handleSingleNode(elementAccessExpression.argumentExpression, file, sourceFile)
          break
        case ts.SyntaxKind.CallExpression:
          const callExpression = node as ts.CallExpression
          handleSingleNode(callExpression.expression, file, sourceFile)
          handleMultipleNodes(callExpression.arguments, file, sourceFile)
          handleMultipleNodes(callExpression.typeArguments, file, sourceFile)
          break
        case ts.SyntaxKind.NewExpression:
          const newExpression = node as ts.NewExpression
          handleSingleNode(newExpression.expression, file, sourceFile)
          handleMultipleNodes(newExpression.arguments, file, sourceFile)
          handleMultipleNodes(newExpression.typeArguments, file, sourceFile)
          break
        case ts.SyntaxKind.TaggedTemplateExpression:
          const taggedTemplateExpression = node as ts.TaggedTemplateExpression
          handleSingleNode(taggedTemplateExpression.template, file, sourceFile)
          break
        case ts.SyntaxKind.TypeAssertionExpression:
          const typeAssertion = node as ts.TypeAssertion
          handleSingleNode(typeAssertion.expression, file, sourceFile)
          handleSingleNode(typeAssertion.type, file, sourceFile)
          break
        case ts.SyntaxKind.ParenthesizedExpression:
          const parenthesizedExpression = node as ts.ParenthesizedExpression
          handleSingleNode(parenthesizedExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.FunctionExpression:
          const functionExpression = node as ts.FunctionExpression
          handleSingleNode(functionExpression.name, file, sourceFile)
          handleMultipleNodes(functionExpression.parameters, file, sourceFile)
          handleSingleNode(functionExpression.body, file, sourceFile)
          handleSingleNode(functionExpression.asteriskToken, file, sourceFile)
          handleSingleNode(functionExpression.questionToken, file, sourceFile)
          handleSingleNode(functionExpression.type, file, sourceFile)
          handleMultipleNodes(functionExpression.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.ArrowFunction:
          const arrowFunction = node as ts.ArrowFunction
          handleSingleNode(arrowFunction.name, file, sourceFile)
          handleMultipleNodes(arrowFunction.parameters, file, sourceFile)
          handleSingleNode(arrowFunction.body, file, sourceFile)
          handleSingleNode(arrowFunction.asteriskToken, file, sourceFile)
          handleSingleNode(arrowFunction.questionToken, file, sourceFile)
          handleSingleNode(arrowFunction.type, file, sourceFile)
          handleMultipleNodes(arrowFunction.typeParameters, file, sourceFile)
          handleSingleNode(arrowFunction.equalsGreaterThanToken, file, sourceFile)
          break
        case ts.SyntaxKind.DeleteExpression:
          const deleteExpression = node as ts.DeleteExpression
          handleSingleNode(deleteExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.TypeOfExpression:
          const typeOfExpression = node as ts.TypeOfExpression
          handleSingleNode(typeOfExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.VoidExpression:
          const voidExpression = node as ts.VoidExpression
          handleSingleNode(voidExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.AwaitExpression:
          const awaitExpression = node as ts.AwaitExpression
          handleSingleNode(awaitExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.PrefixUnaryExpression:
          const prefixUnaryExpression = node as ts.PrefixUnaryExpression
          handleSingleNode(prefixUnaryExpression.operand, file, sourceFile)
          break
        case ts.SyntaxKind.PostfixUnaryExpression:
          const postfixUnaryExpression = node as ts.PostfixUnaryExpression
          handleSingleNode(postfixUnaryExpression.operand, file, sourceFile)
          break
        case ts.SyntaxKind.BinaryExpression:
          const binaryExpression = node as ts.BinaryExpression
          handleSingleNode(binaryExpression.left, file, sourceFile)
          handleSingleNode(binaryExpression.right, file, sourceFile)
          handleSingleNode(binaryExpression.operatorToken, file, sourceFile)
          break
        case ts.SyntaxKind.ConditionalExpression:
          const conditionalExpression = node as ts.ConditionalExpression
          handleSingleNode(conditionalExpression.condition, file, sourceFile)
          handleSingleNode(conditionalExpression.colonToken, file, sourceFile)
          handleSingleNode(conditionalExpression.questionToken, file, sourceFile)
          handleSingleNode(conditionalExpression.whenTrue, file, sourceFile)
          handleSingleNode(conditionalExpression.whenFalse, file, sourceFile)
          break
        case ts.SyntaxKind.TemplateExpression:
          const templateExpression = node as ts.TemplateExpression
          handleMultipleNodes(templateExpression.templateSpans, file, sourceFile)
          break
        case ts.SyntaxKind.YieldExpression:
          const yieldExpression = node as ts.YieldExpression
          handleSingleNode(yieldExpression.asteriskToken, file, sourceFile)
          handleSingleNode(yieldExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.SpreadElement:
          const spreadElement = node as ts.SpreadElement
          handleSingleNode(spreadElement.expression, file, sourceFile)
          break
        case ts.SyntaxKind.ClassExpression:
          const classExpression = node as ts.ClassExpression
          handleSingleNode(classExpression.name, file, sourceFile)
          handleMultipleNodes(classExpression.typeParameters, file, sourceFile)
          handleMultipleNodes(classExpression.members, file, sourceFile)
          handleMultipleNodes(classExpression.heritageClauses, file, sourceFile)
          break
        case ts.SyntaxKind.OmittedExpression:
          break
        case ts.SyntaxKind.ExpressionWithTypeArguments:
          const expressionWithTypeArguments = node as ts.ExpressionWithTypeArguments
          handleSingleNode(expressionWithTypeArguments.expression, file, sourceFile)
          handleMultipleNodes(expressionWithTypeArguments.typeArguments, file, sourceFile)
          break
        case ts.SyntaxKind.AsExpression:
          const asExpression = node as ts.AsExpression
          handleSingleNode(asExpression.expression, file, sourceFile)
          handleSingleNode(asExpression.type, file, sourceFile)
          break
        case ts.SyntaxKind.NonNullExpression:
          const nonNullExpression = node as ts.NonNullExpression
          handleSingleNode(nonNullExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.MetaProperty:
          const metaProperty = node as ts.MetaProperty
          handleSingleNode(metaProperty.name, file, sourceFile)
          break
        case ts.SyntaxKind.TemplateSpan:
          const templateSpan = node as ts.TemplateSpan
          handleSingleNode(templateSpan.expression, file, sourceFile)
          handleSingleNode(templateSpan.literal, file, sourceFile)
          break
        case ts.SyntaxKind.SemicolonClassElement:
          const semicolonClassElement = node as ts.SemicolonClassElement
          handleSingleNode(semicolonClassElement.name, file, sourceFile)
          break
        case ts.SyntaxKind.Block:
          const block = node as ts.Block
          handleMultipleNodes(block.statements, file, sourceFile)
          break
        case ts.SyntaxKind.VariableStatement:
          const variableStatement = node as ts.VariableStatement
          handleSingleNode(variableStatement.declarationList, file, sourceFile)
          break
        case ts.SyntaxKind.EmptyStatement:
          break
        case ts.SyntaxKind.ExpressionStatement:
          const expressionStatement = node as ts.ExpressionStatement
          handleSingleNode(expressionStatement.expression, file, sourceFile)
          break
        case ts.SyntaxKind.IfStatement:
          const ifStatement = node as ts.IfStatement
          handleSingleNode(ifStatement.expression, file, sourceFile)
          handleSingleNode(ifStatement.thenStatement, file, sourceFile)
          handleSingleNode(ifStatement.elseStatement, file, sourceFile)
          break
        case ts.SyntaxKind.DoStatement:
          const doStatement = node as ts.DoStatement
          handleSingleNode(doStatement.expression, file, sourceFile)
          handleSingleNode(doStatement.statement, file, sourceFile)
          break
        case ts.SyntaxKind.WhileStatement:
          const whileStatement = node as ts.WhileStatement
          handleSingleNode(whileStatement.statement, file, sourceFile)
          handleSingleNode(whileStatement.expression, file, sourceFile)
          break
        case ts.SyntaxKind.ForStatement:
          const forStatement = node as ts.ForStatement
          handleSingleNode(forStatement.initializer, file, sourceFile)
          handleSingleNode(forStatement.condition, file, sourceFile)
          handleSingleNode(forStatement.incrementor, file, sourceFile)
          handleSingleNode(forStatement.statement, file, sourceFile)
          break
        case ts.SyntaxKind.ForInStatement:
          const forInStatement = node as ts.ForInStatement
          handleSingleNode(forInStatement.initializer, file, sourceFile)
          handleSingleNode(forInStatement.expression, file, sourceFile)
          handleSingleNode(forInStatement.statement, file, sourceFile)
          break
        case ts.SyntaxKind.ForOfStatement:
          const forOfStatement = node as ts.ForOfStatement
          handleSingleNode(forOfStatement.initializer, file, sourceFile)
          handleSingleNode(forOfStatement.statement, file, sourceFile)
          handleSingleNode(forOfStatement.expression, file, sourceFile)
          handleSingleNode(forOfStatement.awaitModifier, file, sourceFile)
          break
        case ts.SyntaxKind.ContinueStatement:
        case ts.SyntaxKind.BreakStatement:
          break
        case ts.SyntaxKind.ReturnStatement:
          const returnStatement = node as ts.ReturnStatement
          handleSingleNode(returnStatement.expression, file, sourceFile)
          break
        case ts.SyntaxKind.WithStatement:
          const withStatement = node as ts.WithStatement
          handleSingleNode(withStatement.expression, file, sourceFile)
          handleSingleNode(withStatement.statement, file, sourceFile)
          break
        case ts.SyntaxKind.SwitchStatement:
          const switchStatement = node as ts.SwitchStatement
          handleSingleNode(switchStatement.expression, file, sourceFile)
          handleSingleNode(switchStatement.caseBlock, file, sourceFile)
          break
        case ts.SyntaxKind.LabeledStatement:
          const labeledStatement = node as ts.LabeledStatement
          handleSingleNode(labeledStatement.label, file, sourceFile)
          handleSingleNode(labeledStatement.statement, file, sourceFile)
          break
        case ts.SyntaxKind.ThrowStatement:
          const throwStatement = node as ts.ThrowStatement
          handleSingleNode(throwStatement.expression, file, sourceFile)
          break
        case ts.SyntaxKind.TryStatement:
          const tryStatement = node as ts.TryStatement
          handleSingleNode(tryStatement.tryBlock, file, sourceFile)
          handleSingleNode(tryStatement.catchClause, file, sourceFile)
          handleSingleNode(tryStatement.finallyBlock, file, sourceFile)
          break
        case ts.SyntaxKind.DebuggerStatement:
          break
        case ts.SyntaxKind.VariableDeclaration:
          const variableDeclaration = node as ts.VariableDeclaration
          handleSingleNode(variableDeclaration.name, file, sourceFile)
          handleSingleNode(variableDeclaration.type, file, sourceFile)
          handleSingleNode(variableDeclaration.initializer, file, sourceFile)
          break
        case ts.SyntaxKind.VariableDeclarationList:
          const declarationList = node as ts.VariableDeclarationList
          handleMultipleNodes(declarationList.declarations, file, sourceFile)
          break
        case ts.SyntaxKind.FunctionDeclaration:
          const functionDeclaration = node as ts.FunctionDeclaration
          handleSingleNode(functionDeclaration.name, file, sourceFile)
          handleMultipleNodes(functionDeclaration.parameters, file, sourceFile)
          handleSingleNode(functionDeclaration.body, file, sourceFile)
          handleSingleNode(functionDeclaration.asteriskToken, file, sourceFile)
          handleSingleNode(functionDeclaration.questionToken, file, sourceFile)
          handleSingleNode(functionDeclaration.type, file, sourceFile)
          handleMultipleNodes(functionDeclaration.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.ClassDeclaration:
          const classDeclaration = node as ts.ClassDeclaration
          handleSingleNode(classDeclaration.name, file, sourceFile)
          handleMultipleNodes(classDeclaration.members, file, sourceFile)
          handleMultipleNodes(classDeclaration.typeParameters, file, sourceFile)
          handleMultipleNodes(classDeclaration.heritageClauses, file, sourceFile)
          break
        case ts.SyntaxKind.InterfaceDeclaration:
          const interfaceDeclaration = node as ts.InterfaceDeclaration
          handleSingleNode(interfaceDeclaration.name, file, sourceFile)
          handleMultipleNodes(interfaceDeclaration.members, file, sourceFile)
          handleMultipleNodes(interfaceDeclaration.typeParameters, file, sourceFile)
          handleMultipleNodes(interfaceDeclaration.heritageClauses, file, sourceFile)
          break
        case ts.SyntaxKind.TypeAliasDeclaration:
          const typeAliasDeclaration = node as ts.TypeAliasDeclaration
          handleSingleNode(typeAliasDeclaration.name, file, sourceFile)
          handleSingleNode(typeAliasDeclaration.type, file, sourceFile)
          handleMultipleNodes(typeAliasDeclaration.typeParameters, file, sourceFile)
          break
        case ts.SyntaxKind.EnumDeclaration:
          const enumDeclaration = node as ts.EnumDeclaration
          handleSingleNode(enumDeclaration.name, file, sourceFile)
          handleMultipleNodes(enumDeclaration.members, file, sourceFile)
          break
        case ts.SyntaxKind.ModuleDeclaration:
          const moduleDeclaration = node as ts.ModuleDeclaration
          handleSingleNode(moduleDeclaration.name, file, sourceFile)
          handleSingleNode(moduleDeclaration.body, file, sourceFile)
          break
        case ts.SyntaxKind.ModuleBlock:
          const moduleBlock = node as ts.ModuleBlock
          handleMultipleNodes(moduleBlock.statements, file, sourceFile)
          break
        case ts.SyntaxKind.CaseBlock:
          const caseBlock = node as ts.CaseBlock
          handleMultipleNodes(caseBlock.clauses, file, sourceFile)
          break
        case ts.SyntaxKind.NamespaceExportDeclaration:
          const namespaceExportDeclaration = node as ts.NamespaceExportDeclaration
          handleSingleNode(namespaceExportDeclaration.name, file, sourceFile)
          break
        case ts.SyntaxKind.ImportEqualsDeclaration:
          const importEqualsDeclaration = node as ts.ImportEqualsDeclaration
          handleSingleNode(importEqualsDeclaration.name, file, sourceFile)
          handleSingleNode(importEqualsDeclaration.moduleReference, file, sourceFile)
          break
        case ts.SyntaxKind.ImportDeclaration:
          const importDeclaration = node as ts.ImportDeclaration
          handleSingleNode(importDeclaration.importClause, file, sourceFile)
          handleSingleNode(importDeclaration.moduleSpecifier, file, sourceFile)
          break
        case ts.SyntaxKind.ImportClause:
          const importClause = node as ts.ImportClause
          handleSingleNode(importClause.name, file, sourceFile)
          handleSingleNode(importClause.namedBindings, file, sourceFile)
          break
        case ts.SyntaxKind.NamespaceImport:
          const namespaceImport = node as ts.NamespaceImport
          handleSingleNode(namespaceImport.name, file, sourceFile)
          break
        case ts.SyntaxKind.NamedImports:
          const namedImports = node as ts.NamedImports
          handleMultipleNodes(namedImports.elements, file, sourceFile)
          break
        case ts.SyntaxKind.ImportSpecifier:
          const importSpecifier = node as ts.ImportSpecifier
          handleSingleNode(importSpecifier.name, file, sourceFile)
          handleSingleNode(importSpecifier.propertyName, file, sourceFile)
          break
        case ts.SyntaxKind.ExportAssignment:
          const exportAssignment = node as ts.ExportAssignment
          handleSingleNode(exportAssignment.name, file, sourceFile)
          handleSingleNode(exportAssignment.expression, file, sourceFile)
          break
        case ts.SyntaxKind.ExportDeclaration:
          const exportDeclaration = node as ts.ExportDeclaration
          handleSingleNode(exportDeclaration.exportClause, file, sourceFile)
          handleSingleNode(exportDeclaration.name, file, sourceFile)
          handleSingleNode(exportDeclaration.moduleSpecifier, file, sourceFile)
          break
        case ts.SyntaxKind.NamedExports:
          const namedExports = node as ts.NamedExports
          handleMultipleNodes(namedExports.elements, file, sourceFile)
          break
        case ts.SyntaxKind.ExportSpecifier:
          const exportSpecifier = node as ts.ExportSpecifier
          handleSingleNode(exportSpecifier.name, file, sourceFile)
          handleSingleNode(exportSpecifier.propertyName, file, sourceFile)
          break
        case ts.SyntaxKind.MissingDeclaration:
          const missingDeclaration = node as ts.MissingDeclaration
          handleSingleNode(missingDeclaration.name, file, sourceFile)
          break
        case ts.SyntaxKind.ExternalModuleReference:
          const externalModuleReference = node as ts.ExternalModuleReference
          handleSingleNode(externalModuleReference.expression, file, sourceFile)
          break
        case ts.SyntaxKind.JsxElement:
          const jsxElement = node as ts.JsxElement
          handleSingleNode(jsxElement.openingElement, file, sourceFile)
          handleSingleNode(jsxElement.closingElement, file, sourceFile)
          handleMultipleNodes(jsxElement.children, file, sourceFile)
          break
        case ts.SyntaxKind.JsxSelfClosingElement:
          const jsxSelfClosingElement = node as ts.JsxSelfClosingElement
          handleSingleNode(jsxSelfClosingElement.attributes, file, sourceFile)
          handleSingleNode(jsxSelfClosingElement.tagName, file, sourceFile)
          break
        case ts.SyntaxKind.JsxOpeningElement:
          const jsxOpeningElement = node as ts.JsxOpeningElement
          handleSingleNode(jsxOpeningElement.attributes, file, sourceFile)
          handleSingleNode(jsxOpeningElement.tagName, file, sourceFile)
          break
        case ts.SyntaxKind.JsxClosingElement:
          const jsxClosingElement = node as ts.JsxClosingElement
          handleSingleNode(jsxClosingElement.tagName, file, sourceFile)
          break
        case ts.SyntaxKind.JsxFragment:
          const jsxFragment = node as ts.JsxFragment
          handleSingleNode(jsxFragment.openingFragment, file, sourceFile)
          handleSingleNode(jsxFragment.closingFragment, file, sourceFile)
          handleMultipleNodes(jsxFragment.children, file, sourceFile)
          break
        case ts.SyntaxKind.JsxOpeningFragment:
          break
        case ts.SyntaxKind.JsxClosingFragment:
          break
        case ts.SyntaxKind.JsxAttribute:
          const jsxAttribute = node as ts.JsxAttribute
          handleSingleNode(jsxAttribute.name, file, sourceFile)
          handleSingleNode(jsxAttribute.initializer, file, sourceFile)
          break
        case ts.SyntaxKind.JsxAttributes:
          const jsxAttributes = node as ts.JsxAttributes
          handleMultipleNodes(jsxAttributes.properties, file, sourceFile)
          break
        case ts.SyntaxKind.JsxSpreadAttribute:
          const jsxSpreadAttribute = node as ts.JsxSpreadAttribute
          handleSingleNode(jsxSpreadAttribute.name, file, sourceFile)
          handleSingleNode(jsxSpreadAttribute.expression, file, sourceFile)
          break
        case ts.SyntaxKind.JsxExpression:
          const jsxExpression = node as ts.JsxExpression
          handleSingleNode(jsxExpression.dotDotDotToken, file, sourceFile)
          handleSingleNode(jsxExpression.expression, file, sourceFile)
          break
        case ts.SyntaxKind.CaseClause:
          const caseClause = node as ts.CaseClause
          handleMultipleNodes(caseClause.statements, file, sourceFile)
          handleSingleNode(caseClause.expression, file, sourceFile)
          break
        case ts.SyntaxKind.DefaultClause:
          const defaultClause = node as ts.DefaultClause
          handleMultipleNodes(defaultClause.statements, file, sourceFile)
          break
        case ts.SyntaxKind.HeritageClause:
          const heritageClause = node as ts.HeritageClause
          handleMultipleNodes(heritageClause.types, file, sourceFile)
          break
        case ts.SyntaxKind.CatchClause:
          const catchClause = node as ts.CatchClause
          handleSingleNode(catchClause.block, file, sourceFile)
          break
        case ts.SyntaxKind.PropertyAssignment:
          const propertyAssignmentExpression = node as ts.PropertyAssignment
          handleSingleNode(propertyAssignmentExpression.name, file, sourceFile)
          handleSingleNode(propertyAssignmentExpression.questionToken, file, sourceFile)
          handleSingleNode(propertyAssignmentExpression.initializer, file, sourceFile)
          break
        case ts.SyntaxKind.ShorthandPropertyAssignment:
          const shorthandPropertyAssignment = node as ts.ShorthandPropertyAssignment
          handleSingleNode(shorthandPropertyAssignment.name, file, sourceFile)
          handleSingleNode(shorthandPropertyAssignment.questionToken, file, sourceFile)
          handleSingleNode(shorthandPropertyAssignment.equalsToken, file, sourceFile)
          handleSingleNode(shorthandPropertyAssignment.objectAssignmentInitializer, file, sourceFile)
          break
        case ts.SyntaxKind.SpreadAssignment:
          const spreadAssignment = node as ts.SpreadAssignment
          handleSingleNode(spreadAssignment.name, file, sourceFile)
          handleSingleNode(spreadAssignment.expression, file, sourceFile)
          break
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.SourceFile:
        case ts.SyntaxKind.Bundle:
        case ts.SyntaxKind.JSDocTypeExpression:
        case ts.SyntaxKind.JSDocAllType:
        case ts.SyntaxKind.JSDocUnknownType:
        case ts.SyntaxKind.JSDocNullableType:
        case ts.SyntaxKind.JSDocNonNullableType:
        case ts.SyntaxKind.JSDocOptionalType:
        case ts.SyntaxKind.JSDocFunctionType:
        case ts.SyntaxKind.JSDocVariadicType:
        case ts.SyntaxKind.JSDocComment:
        case ts.SyntaxKind.JSDocTag:
        case ts.SyntaxKind.JSDocAugmentsTag:
        case ts.SyntaxKind.JSDocClassTag:
        case ts.SyntaxKind.JSDocParameterTag:
        case ts.SyntaxKind.JSDocReturnTag:
        case ts.SyntaxKind.JSDocTypeTag:
        case ts.SyntaxKind.JSDocTemplateTag:
        case ts.SyntaxKind.JSDocTypedefTag:
        case ts.SyntaxKind.JSDocPropertyTag:
        case ts.SyntaxKind.JSDocTypeLiteral:
        case ts.SyntaxKind.SyntaxList:
        case ts.SyntaxKind.NotEmittedStatement:
        case ts.SyntaxKind.PartiallyEmittedExpression:
        case ts.SyntaxKind.CommaListExpression:
        case ts.SyntaxKind.MergeDeclarationMarker:
        case ts.SyntaxKind.EndOfDeclarationMarker:
        case ts.SyntaxKind.Count:
          break
        default:
          console.log(`warning: unhandled node kind: ${node.kind}`)
      }
    }

    for (const sourceFile of program.getSourceFiles()) {
      let file = sourceFile.fileName
      if (!file.includes('node_modules')) {
        file = path.relative(process.cwd(), file)
        // checks if looking for a single file or a whole folder (if the arguement -f was given)
        if (files) {
          sourceFile.forEachChild((node: any) => {
            if (file.includes(files)) {
              return handleSingleNode(node, file, sourceFile)
            }
          })
        } else {
          sourceFile.forEachChild((node: any) => {
            return handleSingleNode(node, file, sourceFile)
          })
        }
      }
    }

    return { correctCount, totalCount, anys, program }
  }
}
