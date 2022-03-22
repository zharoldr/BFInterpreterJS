function download(text) {
    var element = document.createElement('a');
    
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'bf.cpp');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    document.body.removeChild(element);
}

function tabs(count) {
    retext = "";
    for (var i = 0; i < count; i++) {
        retext += "  ";
    }
    return retext;
}

function genCode(text) {

    var JSCode = "var st = Date.now(); var dt = 0; var a = new Uint8Array(0xffff).fill(0); var p = 0; var o=\"\";";
    var CCCode = "#include <iostream>\n\nint main() {\n  unsigned char a[0xffff]={0};\n  unsigned char* p=a;\n\n\n"

    var left_count  = 0;
    var right_count = 0;
    var plus_count  = 0;
    var minus_count = 0;

    var brace_count = 0;

    for (var i = 0; i < text.length; i++) {
        switch (text[i]) {
            case '>': {
                if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if(plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                right_count++; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '<': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                right_count = 0; left_count++;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '+': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                right_count = 0; left_count = 0;
                plus_count++; minus_count = 0;
                break;
            }
            case '-': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if(plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count++;
                break;
            }
            case '[': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                JSCode += "while (a[p] != 0) {dt = Date.now() - st; if (dt > "+document.getElementById("timeout").value+") {o = \"Timed out!\"; break;}";
                CCCode += tabs(1+brace_count)+" while (*p) {\n";
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                brace_count++;
                break;
            }
            case ']': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                JSCode += "}";
                CCCode += tabs(brace_count)+" }\n";
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                brace_count--;
                if (brace_count < 0) {
                    return [false , CCCode];
                }
                break;
            }
            case ',': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                CCCode += tabs(1+brace_count)+" std::cin >> p;\n"
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            case '.': {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                JSCode += "o += String.fromCharCode(a[p]);";
                CCCode += tabs(1+brace_count)+" std::cout << *p;\n"
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
            default: {
                if(right_count != 0) {
                    JSCode += "p+="+right_count+";"
                    CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
                } else if(left_count != 0) {
                    JSCode += "p-="+left_count+";"
                    CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
                } else if (plus_count != 0) {
                    JSCode += "a[p]+="+plus_count+";"
                    CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
                } else if(minus_count != 0) {
                    JSCode += "a[p]-="+minus_count+";"
                    CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
                }
                right_count = 0; left_count = 0;
                plus_count = 0; minus_count = 0;
                break;
            }
        }
    }

    if(right_count != 0) {
        JSCode += "p+="+right_count+";"
        CCCode += tabs(1+brace_count)+" p += "+right_count+";\n";
    } else if(left_count != 0) {
        JSCode += "p-="+left_count+";"
        CCCode += tabs(1+brace_count)+" p -= "+left_count+";\n";
    } else if (plus_count != 0) {
        JSCode += "a[p]+="+plus_count+";"
        CCCode += tabs(1+brace_count)+"*p += "+plus_count+";\n";
    } else if(minus_count != 0) {
        JSCode += "a[p]-="+minus_count+";"
        CCCode += tabs(1+brace_count)+"*p -= "+minus_count+";\n";
    }
    right_count = 0; left_count = 0;
    plus_count = 0; minus_count = 0;

    JSCode += "var mem_log = \"\";for (var i = 0; i < 0xffff; i++) {if (i % 12 == 0) {mem_log += '\\n';}mem_log += a[i].toString(16).padStart(2, '0') + ' ';} return [o, mem_log];";
    CCCode += "\n\n  return 0;\n}";

    return (brace_count == 0) ? [JSCode, CCCode] : [false, CCCode];
}

document.getElementById("bf").value = "++++++++[>++++++++>++++++++<<-]>++.++++.+++.<++++++[>++++++<-]>+.++++++.>>++++++[>++++++<-]>[-<<+>>]<<+[>+>+<<-]>.+++++++++++++.--.++.>.<++.>.<--.>[-]++++[>++[>+++++<-]<-]>>[-<<<->>>]<<<.+++++++++.<+++++[<<++>>-]<<.>>>>++++[>++++[>++<-]<-]>>...>++++[>++++<-]>[-<<<<<->>>>>]<<<<<.<<--.-------------.>>[-]<<[->+>+<<]>----.>+++++++++++++++.<++++.-.<<.>>>>>>......<<++++++++[>++++++++>++++++++<<-]>++.<<+++++.<<<.>++++++++[>>>++[>>>++<<<-]<<<-]>>>>>>.<<<<<----------.>>>>+.[->>+>+<<<]>>++.<<<<++++[<---->-]<-.-------.>++++[<++++>-]<+.+++++++.>>>>.<++++[-<++++>]<.>++++[->>++++<<]>>++.--.."

var code = genCode(document.getElementById("bf").value);

var jsfunc = Function(code[0]);

document.getElementById("cpp").value = code[1];

document.getElementById("mem").value = jsfunc()[1];
document.getElementById("output").value = jsfunc()[0];

document.getElementById("download").onclick = download(code[1]);

document.getElementById("bf").oninput = function() {

    code = genCode(document.getElementById("bf").value);
    
    jsfunc = Function(code[0]);

    var ans = jsfunc();

    document.getElementById("cpp").value = code[1];

    if (ans) {
        document.getElementById("mem").value = ans[1];
        document.getElementById("output").value = ans[0];
    } else {
        document.getElementById("output").value = "Brace Mismatch";
    }
}