@rem Script for starting platform serving documentation at http://localhost:8080

@rem FAQ.
@rem ==============================================================================
@rem Q: Which platform is used for server?
@rem A: If "theplatform-book" is bundled together with platform distribution,
@rem    then this distribution is used.
@rem    Otherwise env variable OHOME must point to any existing platform root dir
@rem ==============================================================================
@rem Q: How to kill server process?
@rem A: Enter \\ (double back slashes) at REPL to kill server process
@rem ==============================================================================

@rem use local tachyon if the book is part of platform distribution
@pushd ..\..
@if exist tachyon.exe^
   echo "Detected bundled book"
@if exist tachyon.exe^
   SET OHOME=%~dp0\..\..
@popd 

@set PATH=%PATH%:%OHOME%
@set BIND=0.0.0.0:8080

@set OLOG=debug 
@if not exist "%OHOME%\tachyon.exe"^
   GOTO :fail
"%OHOME%\tachyon" -c 0 -f server.o

:fail
@echo OHOME env var expected to contain platform root directory

